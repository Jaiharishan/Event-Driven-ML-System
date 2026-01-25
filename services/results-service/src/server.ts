import "dotenv/config";
import express from 'express';
import { startConsumer } from './kafka/consumer';
import resultsRoute from './routes/results';
import { config } from './config';

async function start() {
  console.log("KAFKA_BROKER =", process.env.KAFKA_BROKERS);
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
