import Fastify from 'fastify';
import { app } from './app/app';

const host = process.env.SERVER_HOST ?? '0.0.0.0';
const port = Number(process.env.SERVER_PORT) || 3000;

// Instantiate Fastify with some config
const server = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

// Register your application as a normal plugin.
server.register(app);

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
