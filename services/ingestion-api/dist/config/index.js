"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const getEnv_1 = require("./getEnv");
exports.config = {
    serviceName: 'ingestion-api',
    port: (0, getEnv_1.getEnv)('PORT') || 3000,
    kafka: {
        brokers: ((0, getEnv_1.getEnv)('KAFKA_BROKERS') || 'kafka:9092').split(','),
        clientId: 'ingestion-api'
    }
};
