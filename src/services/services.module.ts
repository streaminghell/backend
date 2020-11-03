import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesTelegramUpdate } from './services.telegram-update';

@Module({
  providers: [ServicesService, ServicesTelegramUpdate],
})
export class ServicesModule {}
