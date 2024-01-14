import { KafkaTopics, KafkaUser } from '@kafka-types';
import { Controller, OnModuleInit } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    private readonly userService: UsersService // private readonly kafkaClient: ClientKafka
  ) {}

  @MessagePattern(KafkaTopics.USER)
  test1(data: unknown) {
    console.log('!!!!!!! USER test1\n', data);
  }

  @EventPattern(KafkaTopics.USER)
  test2(data: unknown) {
    console.log('!!!!!!! USER test2\n', data);
  }

  async onModuleInit() {
    const reqPatterns = [KafkaTopics.USER];
    await this.userService.findOne();

    // reqPatterns.forEach((pattern) => {
    //   this.kafkaClient.subscribeToResponseOf(pattern);
    // });
  }
}
