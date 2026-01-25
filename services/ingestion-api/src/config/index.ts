import { getEnv } from './getEnv';

export const config = {
  serviceName: 'ingestion-api',
  port: 3000,

  kafka: {
    brokers: (getEnv('KAFKA_BROKERS') || 'kafka:9092').split(','),
    clientId: 'ingestion-api'
  }
};

