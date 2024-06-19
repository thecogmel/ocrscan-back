import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    const passwordCompare = await comparePasswords(pass, user.password);
    if (user && passwordCompare) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    const tokens = {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };

    return {
      token: tokens,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updateAt: user.updateAt,
      },
    };
  }

  async refreshToken(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    const tokens = {
      access_token: this.jwtService.sign(payload),
    };

    return {
      token: tokens,
    };
  }
}
