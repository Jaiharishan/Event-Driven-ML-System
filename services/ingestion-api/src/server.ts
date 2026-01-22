import express from 'express';
import bodyParser from 'body-parser';
import classifyRoute from './routes/classify';
import { connectProducer } from './kafka/producer';
import { register } from './metrics/prometheus';
import { config } from './config';

async function start() {
  await connectProducer();

  const app = express();
  app.use(bodyParser.json());

  app.use('/api', classifyRoute);

  app.get('/metrics', async (_req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  });

  app.listen(config.port, () => {
    console.log(`Ingestion service running on port ${config.port}`);
  });
}

start().catch(err => {
  console.error('Failed to start service', err);
  process.exit(1);
});
