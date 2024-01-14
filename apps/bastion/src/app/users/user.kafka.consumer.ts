import { KafkaTopics } from '@kafka-types';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserKafkaConsumer implements OnModuleInit {
  constructor(
    @Inject('USER_SERVICE') private readonly kafkaClient: ClientKafka
  ) {}

  // @MessagePattern(KafkaTopics.USER)
  // test1(data: unknown) {
  //   console.log('!!!!!!! USER test1\n', data);
  // }

  // @EventPattern(KafkaTopics.USER)
  // test2(data: unknown) {
  //   console.log('!!!!!!! USER test2\n', data);
  // }

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf(KafkaTopics.USER);
    await this.kafkaClient.connect();
    const consumerAssignments = this.kafkaClient.getConsumerAssignments();
    console.log('!!!!! consumerAssignments\n', consumerAssignments);
  }
}
