import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserKafkaProducer } from './user.kafka.producer';
import { UserKafkaConsumer } from './user.kafka.consumer';

@Module({
  providers: [UserKafkaProducer, UserKafkaConsumer, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
