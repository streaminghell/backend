import { Module } from '@nestjs/common';
import { StartService } from './start.service';
import { StartTelegramUpdate } from './start.telegram-update';

@Module({
  providers: [StartService, StartTelegramUpdate],
})
export class StartModule {}
