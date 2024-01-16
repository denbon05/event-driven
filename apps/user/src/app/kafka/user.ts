import { KafkaTopics } from '@kafka-types';
import { FastifyInstance } from 'fastify';
import useUserHandler from '../handlers/UserHandler';

const consume = async (fastify: FastifyInstance) => {
  const userHandler = useUserHandler(fastify);

  await fastify.kafkaConsumer.subscribe({
    topic: KafkaTopics.USER,
    fromBeginning: true,
  });

  fastify.kafkaConsumer.run({
    eachMessage: async ({ message: { key, value } }) => {
      const payload = JSON.parse(value.toString());
      userHandler.emit(key.toString('utf-8'), payload);
    },
  });
};

export default async function (fastify: FastifyInstance) {
  try {
    await consume(fastify);
  } catch (err) {
    console.error(err);
    fastify.kafkaProducer.send({
      topic: KafkaTopics.ERROR,
      messages: [{ key: 'user-service', value: JSON.stringify(err) }],
    });
  }
}
