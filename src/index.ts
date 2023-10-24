import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { setupApp } from './base';
import express from 'express';
import * as functions from 'firebase-functions';

const server = express();
const adapter = new ExpressAdapter(server);

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
  );
  await setupApp(app);

  await app.init();
}
bootstrap();

export const api = functions.https.onRequest(server);
