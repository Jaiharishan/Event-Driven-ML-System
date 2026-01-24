import express from 'express';
import { startConsumer } from './kafka/consumer';
import resultsRoute from './routes/results';
import { config } from './config';

async function start() {
  await startConsumer();

  const app = express();
  app.use(express.json());

  app.use('/api', resultsRoute);

  app.listen(config.port, () => {
    console.log(`Result service running on port ${config.port}`);
  });
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
