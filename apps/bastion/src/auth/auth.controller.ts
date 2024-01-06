import { Controller, Post, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import type { ILoginForm, ISignupForm } from '@gui-bastion-types';
import { BastionURIs } from '@gui-bastion-types';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  @Public()
  @Post(BastionURIs.SIGNUP)
  async signup(@Request() req: ExpressRequest<void, void, ISignupForm>) {
    console.log('user', req.body);
    return 'HELLO!!!!!!';
  }

  @Public()
  @Post(BastionURIs.LOGIN)
  async login(@Request() req: ExpressRequest<void, void, ILoginForm>) {
    console.log('user', req.body);
    return 'HELLO!!!!!!';
  }
}
