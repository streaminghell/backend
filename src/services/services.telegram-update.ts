import { Command, Context, Update } from 'nestjs-telegraf';
import { ServicesService } from './services.service';

@Update()
export class ServicesTelegramUpdate {
  constructor(private readonly servicesService: ServicesService) {}

  @Command('services')
  async servicesCommand(ctx: Context): Promise<void> {
    await this.servicesService.sendSupportedServicesMessage(ctx);
  }
}
