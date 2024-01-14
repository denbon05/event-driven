import { SignupVerified } from '@bastion-user-types';
import { Injectable } from '@nestjs/common';
import { UserKafkaConsumer } from './user.kafka.consumer';
import { UserKafkaProducer } from './user.kafka.producer';

@Injectable()
export class UsersService {
  constructor(
    private readonly userKafkaProducer: UserKafkaProducer,
    private readonly userKafkaConsumer: UserKafkaConsumer
  ) {}

  async createAccount(user: SignupVerified) {
    return this.userKafkaProducer.sendUserVerified(user);
  }

  async findOne() {
    return null;
  }
}
