import { Kafka } from 'kafkajs';
import { config } from '../config';

const kafka = new Kafka({
  clientId: config.kafka.clientId,
  brokers: config.kafka.brokers
});

export const producer = kafka.producer({
  allowAutoTopicCreation: false,
  idempotent: true
});

export async function connectProducer() {
  await producer.connect();
}