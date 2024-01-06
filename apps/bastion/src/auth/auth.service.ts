import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ISignupForm, ILoginForm as IUser } from '@gui-bastion-types';
import { hashValue } from '../utils/crypto';
import { UsersService } from '../users/users.service';

// username: Bret
// password: admin
const ADMIN_PASS_HASH =
  '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(name: string, pass: string): Promise<IUser | null> {
    const user = await this.userService.findOne();

    if (user && hashValue(pass) === ADMIN_PASS_HASH) {
      return user;
    }

    return null;
  }

  async signup(user: ISignupForm) {
    //
  }

  // async login(user: Pick<UserDto, 'username' | 'id'>) {
  //   const payload: IJwtPayload = { username: user.username, sub: user.id };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}
