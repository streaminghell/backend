import { Command, Context, Update } from 'nestjs-telegraf';
import { StartService } from './start.service';

@Update()
export class StartTelegramUpdate {
  constructor(private readonly startService: StartService) {}

  @Command('services')
  async startCommand(ctx: Context): Promise<void> {
    await this.startService.sendStartMessage(ctx);
  }
}
