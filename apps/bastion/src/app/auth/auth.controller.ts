import type { ILoginForm, ISignupForm } from '@gui-bastion-types';
import { BastionURIs } from '@gui-bastion-types';
import { Controller, Post, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { Public } from '../common/decorators/public.decorator';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @Public()
  @Post(BastionURIs.SIGNUP)
  async signup(@Request() req: ExpressRequest<void, void, ISignupForm>) {
    // await this.authService.validateUser(req.body);
    const encrypted = this.authService.encrypt(req.body);
    const res = await this.userService.createAccount(encrypted);
    console.log('KAFKA RES', res);
  }

  @Public()
  @Post(BastionURIs.LOGIN)
  async login(@Request() req: ExpressRequest<void, void, ILoginForm>) {
    console.log('user', req.body);
    return 'HELLO!!!!!!';
  }
}
