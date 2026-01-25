"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConsumer = startConsumer;
const kafkajs_1 = require("kafkajs");
const config_1 = require("../config");
const memory_1 = require("../store/memory");
const kafka = new kafkajs_1.Kafka({
    clientId: 'result-service',
    brokers: config_1.config.kafka.brokers
});
const consumer = kafka.consumer({
    groupId: 'result-service-group'
});
async function startConsumer() {
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
            if (!jobId || !message.value)
                return;
            const payload = JSON.parse(message.value.toString());
            if (topic === 'image.classification.completed') {
                const event = payload;
                (0, memory_1.saveResult)(jobId, {
                    status: 'completed',
                    label: event.label,
                    confidence: event.confidence,
                    latency_ms: event.latency_ms,
                    model_version: event.model_version
                });
            }
            if (topic === 'image.classification.failed') {
                const event = payload;
                (0, memory_1.saveResult)(jobId, {
                    status: 'failed',
                    error: event.error
                });
            }
        }
    });
}
//# sourceMappingURL=consumer.js.map