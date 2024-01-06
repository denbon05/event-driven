import type { ISignupForm } from '@gui-bastion-types';
import { Injectable } from '@nestjs/common';
import { UserURIs } from '@bastion-user-types';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async signup(user: ISignupForm) {
    return this.httpService.post(UserURIs.CREATE_USER, user);
  }

  async findOne() {
    return null;
  }
}
