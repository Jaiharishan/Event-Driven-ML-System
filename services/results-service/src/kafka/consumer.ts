import { Kafka } from 'kafkajs';
import { config } from '../config';
import { saveResult } from '../store/memory';
import {
  ImageClassificationCompletedEvent,
  ImageClassificationFailedEvent
} from '../types/events';

const kafka = new Kafka({
  clientId: 'result-service',
  brokers: config.kafka.brokers
});

const consumer = kafka.consumer({
  groupId: 'result-service-group'
});

export async function startConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: 'image.classification.completed',
    fromBeginning: true
  });

  await consumer.subscribe({
    topic: 'image.classification.failed',
    fromBeginning: true
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const jobId = message.key?.toString();
      if (!jobId || !message.value) return;

      const payload = JSON.parse(message.value.toString());

      if (topic === 'image.classification.completed') {
        const event = payload as ImageClassificationCompletedEvent;

        saveResult(jobId, {
          status: 'completed',
          label: event.label,
          confidence: event.confidence,
          latency_ms: event.latency_ms,
          model_version: event.model_version
        });
      }

      if (topic === 'image.classification.failed') {
        const event = payload as ImageClassificationFailedEvent;

        saveResult(jobId, {
          status: 'failed',
          error: event.error
        });
      }
    }
  });
}
