import { SignupVerified } from '@auth-user-types';
import { KafkaUser } from '@kafka-types';
import EventEmitter from 'events';
import { FastifyInstance } from 'fastify';

export default function (fastify: FastifyInstance) {
  const userHandler = new EventEmitter();

  userHandler.on(
    KafkaUser.Keys.USER_VERIFIED,
    async (payload: SignupVerified) => {
      console.log('ON !!!!!!', payload);
      await fastify.prisma.account.create({
        data: payload,
      });
    }
  );

  return userHandler;
}
