import Fastify from 'fastify';
import dotenv from 'dotenv';
import { app } from './app/app';
import { join } from 'path';

dotenv.config({
  path: join(__dirname, '..', '.env.local'),
});

const host = process.env.HOST ?? 'localhost';
const port = Number(process.env.PORT);

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
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
