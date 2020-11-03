import 'dotenv/config';
import * as appInsights from 'applicationinsights';
appInsights
  .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .setSendLiveMetrics(true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
  .start();

appInsights.defaultClient.commonProperties = {
  environment: process.env.NODE_ENV,
};

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { resolve } from 'path';
import * as helmet from 'helmet';
import * as TelegrafI18n from 'telegraf-i18n';
import { TelegrafMongoSession } from 'telegraf-session-mongodb';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const bootstrapStartTime = Date.now();
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const telegraf = app.get('TelegrafProvider');
  const configService = app.get('ConfigService');

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:3010',
      'http://127.0.0.1:3010',
    ],
    credentials: true,
  });
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  /**
   * Configure Swagger docs
   */
  const options = new DocumentBuilder()
    .setTitle('Streaming Hell API')
    .setDescription('')
    .setVersion('v1')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1', app, document);

  // Telegraf session storage
  await TelegrafMongoSession.setup(telegraf, configService.get('MONGODB_URI'), {
    collectionName: 'telegrafSessions',
    sessionName: 'session',
  });

  // Telegraf i18n instance
  // @ts-ignore
  const i18n = new TelegrafI18n({
    defaultLanguage: 'en',
    allowMissing: false,
    sessionName: 'session',
    useSession: true,
    directory: resolve(__dirname, 'core/i18n'),
  });
  telegraf.use(i18n.middleware());
  app.use(telegraf.webhookCallback('/telegram-bot-webhook'));

  await app.listen(configService.get('app.port')).then(() => {
    const bootstrapEndTime = Date.now() - bootstrapStartTime;
    appInsights.defaultClient.trackMetric({
      name: 'server startup time',
      value: bootstrapEndTime,
    });
  });
};

bootstrap();
