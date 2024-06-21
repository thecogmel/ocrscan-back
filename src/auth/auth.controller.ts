import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { GithubAuthGuard } from './guards/github.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { LoginRequest } from './types';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

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

  @Public()
  @Get()
  @UseGuards(GithubAuthGuard)
  async loginGithub() {
    //
  }

  @Public()
  @Get('callback')
  @UseGuards(GithubAuthGuard)
  async authCallback(@Req() req: any) {
    const user = req.user;

    const payload = { sub: user.id, email: user.email };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
