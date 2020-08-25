import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { TelegramStrategy as Strategy } from 'passport-telegram-official';
import { TelegramUser } from 'passport-telegram-official/dist/strategy';
import { AuthService } from '../auth.service';

@Injectable()
export class TelegramStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      botToken: configService.get('TELEGRAM_BOT_TOKEN'),
    });
  }

  validate(telegramUser: TelegramUser, callback) {
    callback(null, telegramUser);
  }
}
