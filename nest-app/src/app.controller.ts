import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('protected-route')
  @UseGuards(AuthGuard('jwt'))
  protectedRoute() {
    // Access authorized user information from the request using `@Req()` decorator
    return 'Welcome, authorized user!';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
