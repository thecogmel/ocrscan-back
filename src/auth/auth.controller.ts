import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { LoginRequest } from './types';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: LoginRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth-profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Public()
  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req: any) {
    return this.authService.refreshToken(req.user);
  }
}
