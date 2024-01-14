import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
  const prisma = new PrismaClient({
    log: ['query', 'info'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  await prisma.$connect();

  // Make Prisma Client available through the fastify server instance: server.prisma
  server.decorate('prisma', prisma);

  server.addHook('onClose', async (server) => {
    server.log.info('disconnecting Prisma from DB');
    await server.prisma.$disconnect();
  });
});

export default prismaPlugin;
