import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { Consumer, Kafka, Producer } from 'kafkajs';

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
  interface FastifyInstance {
    kafkaProducer: Producer;
    kafkaConsumer: Consumer;
  }
}

const kafkaPlugin: FastifyPluginAsync = fp(async (server) => {
  const kafka = new Kafka({
    clientId: 'user-service',
    brokers: [process.env.KAFKA_BROKER_URI],
    retry: { retries: 3 },
  });

  const producer = kafka.producer({ allowAutoTopicCreation: true });
  const consumer = kafka.consumer({ groupId: 'user-group' });

  await producer.connect();
  await consumer.connect();

  // Make Prisma Client available through the fastify server instance: server.prisma
  server.decorate('kafkaProducer', producer);
  server.decorate('kafkaConsumer', consumer);

  server.addHook('onClose', async (server) => {
    server.log.info('disconnecting kafka');
    await server.kafkaConsumer.disconnect();
    await server.kafkaProducer.disconnect();
  });
});

export default kafkaPlugin;
