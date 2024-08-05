import { Controller, Req, Res, Post, Get, Body, ValidationPipe, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MagicLoginStrategy } from './strategy/magiclogin.strategy';
import { PasswordlessDto } from './dto/passwordless.dto';
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private strategy: MagicLoginStrategy) { }

  @Post('login')
  login(@Req() req, @Res() res, @Body(new ValidationPipe()) body: PasswordlessDto) {
    this.authService.validateUser(body.destination).then(user => {
      if (user) {
        this.strategy.send(req, res);
      } else {
        console.log('User not found');
        return res.send('User not found');
      }
    });
  }

  @UseGuards(AuthGuard('magiclogin'))
  @Get('login/callback')
  callback(@Req() req) {
    // return req.user;
    return this.authService.generateTokens(req.user);
  }
}
