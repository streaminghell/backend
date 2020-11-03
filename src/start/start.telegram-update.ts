import { Command, Context, Update } from 'nestjs-telegraf';
import { StartService } from './start.service';

@Update()
export class StartTelegramUpdate {
  constructor(private readonly startService: StartService) {}

  @Command('start')
  async startCommand(ctx: Context, next): Promise<void> {
    if (ctx.message.chat.type !== 'private') {
      next();
      return;
    }

    await this.startService.sendStartMessage(ctx);
  }
}
