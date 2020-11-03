import { Injectable } from '@nestjs/common';
import { Context } from 'nestjs-telegraf';

@Injectable()
export class StartService {
  async sendStartMessage(ctx: Context): Promise<void> {
    await ctx.replyWithMarkdown(ctx.i18n.t('START_COMMAND_REPLY'));
  }
}
