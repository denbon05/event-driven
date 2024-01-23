import { SignupVerified } from '@bastion-user-types';
import { KafkaTopics } from '@kafka-types';
import {
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka, Payload } from '@nestjs/microservices';
import { Producer, Kafka } from 'kafkajs';

@Injectable()
export class UserKafkaProducer implements OnModuleInit, OnApplicationShutdown {
  private readonly producer: Producer;

  constructor(private readonly configService: ConfigService) {
    const kafka = new Kafka({
      brokers: [configService.getOrThrow<string>('kafkaBrokerURI')],
    });
    this.producer = kafka.producer({ allowAutoTopicCreation: true });
  }

  async sendUserVerified(@Payload() user: SignupVerified) {
    const meta = this.producer.send({
      topic: KafkaTopics.USER,
      messages: [
        {
          value: JSON.stringify(user),
          key: 'user_verified',
        },
      ],
    });
    console.log('!!!!!!! META', meta);
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
