import { getEnv } from './getEnv';

export const config = {
  serviceName: 'results-service',
  port: 3000,

  kafka: {
    brokers: ('localhost:9092').split(','),
    clientId: 'results-service'
  }
};