import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LinksModule } from './links/links.module';
import {
  app,
  graphQLModule,
  mongooseModule,
  sentryModule,
  validationOptions,
  validationSchema,
} from './core/configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [app, graphQLModule, mongooseModule, sentryModule],
      validationOptions,
      validationSchema,
      isGlobal: true,
      expandVariables: true,
    }),
    SentryModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('sentryModule'),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('mongooseModule'),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.get('graphQLModule'),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    LinksModule,
  ],
})
export class AppModule {}
