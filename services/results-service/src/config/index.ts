import { getEnv } from './getEnv';

export const config = {
  serviceName: 'results-service',
  port: 4000,

  kafka: {
    brokers: (getEnv('KAFKA_BROKERS') || 'kafka:9092').split(','),
    clientId: 'results-service'
  }
};