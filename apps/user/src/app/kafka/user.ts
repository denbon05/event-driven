import { KafkaTopics } from '@kafka-types';
import { FastifyInstance } from 'fastify';

export default async function (fastify: FastifyInstance) {
  await fastify.kafkaConsumer.subscribe({
    topic: KafkaTopics.USER,
    fromBeginning: true,
  });

  fastify.kafkaConsumer.run({
    eachMessage: async ({ topic, message }) => {
      console.log('@@@@@@@ User kafka consumer', {
        topic,
        value: message.value.toString('utf-8'),
        key: message.key.toString('utf-8'),
      });
    },
  });
  // TODO write to db
  // catch err -> send to kafka `user` topic
  // notify the gui in case there is an error
}
