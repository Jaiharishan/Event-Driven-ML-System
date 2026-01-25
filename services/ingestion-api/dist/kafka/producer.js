"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.producer = void 0;
exports.connectProducer = connectProducer;
const kafkajs_1 = require("kafkajs");
const config_1 = require("../config");
const kafka = new kafkajs_1.Kafka({
    clientId: config_1.config.kafka.clientId,
    brokers: config_1.config.kafka.brokers
});
exports.producer = kafka.producer({
    allowAutoTopicCreation: false,
    idempotent: true
});
async function connectProducer() {
    await exports.producer.connect();
}
