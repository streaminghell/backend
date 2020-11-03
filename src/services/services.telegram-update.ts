import { Command, Context, Update } from 'nestjs-telegraf';
import { ServicesService } from './services.service';

@Update()
export class ServicesTelegramUpdate {
  constructor(private readonly servicesService: ServicesService) {}

  @Command(['services'])
  async servicesCommand(ctx: Context, next): Promise<void> {
    if (ctx.message.chat.type !== 'private') {
      next();
      return;
    }

    await this.servicesService.sendSupportedServicesMessage(ctx);
  }

  @Command(['services@streaminghell_bot'])
  async servicesCommandGroup(ctx: Context): Promise<void> {
    await this.servicesService.sendSupportedServicesMessage(ctx);
  }
}
