import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard, TelegramAuthGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    description: 'Login with username and password',
  })
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(TelegramAuthGuard)
  @Get('telegram')
  async telegram(@Res() res) {
    res.redirect('https://streaming-hell.com/dashboard');
  }
}
