import { KafkaTopics } from '@kafka-types';
import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consumer, Kafka } from 'kafkajs';

@Injectable()
export class UserKafkaConsumer implements OnModuleInit, OnApplicationShutdown {
  private readonly consumer: Consumer;

  constructor(private readonly configService: ConfigService) {
    const kafka = new Kafka({
      brokers: [configService.getOrThrow<string>('kafkaBrokerURI')],
    });
    this.consumer = kafka.consumer({ groupId: 'bastion-consumer' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: KafkaTopics.USER,
      fromBeginning: true,
    });
    await this.consumer.run({
      eachMessage: async ({ message: { key, value } }) => {
        console.log('YAY !!!!!!!!!\n', { key, value });
      },
    });
  }

  async onApplicationShutdown() {
    await this.consumer.disconnect();
  }
}
