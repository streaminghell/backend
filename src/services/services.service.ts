import { Injectable } from '@nestjs/common';
import { Context } from 'nestjs-telegraf';

@Injectable()
export class ServicesService {
  async sendSupportedServicesMessage(ctx: Context): Promise<void> {
    await ctx.replyWithMarkdown(ctx.i18n.t('SERVICES_COMMAND_REPLY'));
  }
}
