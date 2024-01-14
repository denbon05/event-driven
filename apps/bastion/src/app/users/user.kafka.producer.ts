import { SignupVerified } from '@bastion-user-types';
import { KafkaTopics } from '@kafka-types';
import {
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka, Payload } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';

@Injectable()
export class UserKafkaProducer implements OnModuleInit, OnApplicationShutdown {
  private producer: Producer;

  constructor(
    @Inject('USER_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  async sendUserVerified(@Payload() user: SignupVerified) {
    const meta = await this.producer.send({
      topic: KafkaTopics.USER,
      messages: [{ value: JSON.stringify(user), key: 'user_verified' }],
    });
    // ? the above is similar to the below approach
    // const meta = this.kafkaClient.emit(KafkaTopics.USER, {
    //   value: user,
    //   key: 'user_verified',
    // });
    console.log('!!!!!!! META', meta);
  }

  async onModuleInit() {
    this.producer = await this.kafkaClient.connect();
  }

  async onApplicationShutdown() {
    await this.kafkaClient.close();
  }
}
