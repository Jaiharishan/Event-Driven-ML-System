import client from 'prom-client';

export const register = new client.Registry();
client.collectDefaultMetrics({ register });

export const requestsCounter = new client.Counter({
  name: 'ingestion_requests_total',
  help: 'Total ingestion requests',
  registers: [register]
});

export const kafkaProduceLatency = new client.Histogram({
  name: 'kafka_produce_latency_ms',
  help: 'Kafka produce latency',
  buckets: [5, 10, 25, 50, 100, 200],
  registers: [register]
});

