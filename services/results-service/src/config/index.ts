import { getEnv } from './getEnv';

export const config = {
  serviceName: 'results-service',
  port: Number(process.env.PORT) || 3000,

  kafka: {
    brokers: (getEnv('KAFKA_BROKERS') || 'localhost:9092').split(','),
    clientId: 'results-service'
  }
};