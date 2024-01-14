import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserKafkaProducer } from './user.kafka.producer';
import { UserKafkaConsumer } from './user.kafka.consumer';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'USER_SERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            subscribe: { fromBeginning: true },
            client: {
              clientId: 'bastion',
              brokers: [configService.getOrThrow<string>('kafkaBrokerURI')],
            },
            producer: { allowAutoTopicCreation: true },
            consumer: { groupId: 'user' },
          },
        }),
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UserKafkaProducer, UsersService, UserKafkaConsumer],
  exports: [UsersService],
})
export class UsersModule {}
