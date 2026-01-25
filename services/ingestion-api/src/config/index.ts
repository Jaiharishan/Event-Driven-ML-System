import { getEnv } from './getEnv';

export const config = {
  serviceName: 'ingestion-api',
  port: getEnv('PORT') || 3000,

  kafka: {
    brokers: (getEnv('KAFKA_BROKERS') || 'kafka:9092').split(','),
    clientId: 'ingestion-api'
  }
};

