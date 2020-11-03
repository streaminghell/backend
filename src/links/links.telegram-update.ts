import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Context, On } from 'nestjs-telegraf';
import { LinksService } from './links.service';

@Injectable()
export class LinksTelegramUpdate {
  constructor(private readonly linksService: LinksService) {}

  @On('message')
  async linksInPm(ctx: Context, next): Promise<void> {
    const { message } = ctx;

    if (message?.chat?.type !== 'private') {
      next();
      return;
    }

    /** Check message text exist in Telegram update */
    if (!message.text) {
      throw new HttpException('No text in message', HttpStatus.BAD_REQUEST);
    }

    /** Check streaming links exists in message */
    const urls = this.linksService.findUrlsInMessage(message.text);

    if (!urls) {
      await ctx.reply(ctx.i18n.t('NO_MUSIC_LINKS_IN_MESSAGE'));
      next();
      return;
    }

    /** Delete user message with streaming link */
    // @ts-ignore
    ctx.tg.deleteMessage(ctx.chat.id, ctx.message.message_id);

    try {
      const data = await this.linksService.findLinksByUrls(ctx, urls);
      await this.linksService.replySearchedSongInfo(ctx, data);
      await this.linksService.replyFindedLinks(ctx, data);
    } catch (e) {
      await this.linksService.songLinksNotFound(ctx);
    }


    next();
  }

  @On('message')
  async linksInGroup(ctx: Context, next): Promise<void> {
    if (ctx.message.chat.type === 'private') {
      next();
      return;
    }

    /** Check streaming links exists in message */
    const urls = this.linksService.findUrlsInMessage(ctx.message.text);

    if (!urls) {
      next();
      return;
    }

    /** Delete user message with streaming link */
    // @ts-ignore
    ctx.tg.deleteMessage(ctx.chat.id, ctx.message.message_id);

    try {
      const data = await this.linksService.findLinksByUrls(ctx, urls);
      await this.linksService.replySearchedSongInfo(ctx, data);
      await this.linksService.replyFindedLinks(ctx, data);
    } catch (e) {
      next();
      return;
    }

    next();
  }
}
