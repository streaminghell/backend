import { Test, TestingModule } from '@nestjs/testing';
import { OdesliModule } from '../providers/odesli/odesli.module';
import { LinksController } from './links.controller';
import { LoggerModule } from 'nestjs-pino';

describe('Links Controller', () => {
  let controller: LinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot(), OdesliModule],
      controllers: [LinksController],
    }).compile();

    controller = module.get<LinksController>(LinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
