"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaProduceLatency = exports.requestsCounter = exports.register = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.register = new prom_client_1.default.Registry();
prom_client_1.default.collectDefaultMetrics({ register: exports.register });
exports.requestsCounter = new prom_client_1.default.Counter({
    name: 'ingestion_requests_total',
    help: 'Total ingestion requests',
    registers: [exports.register]
});
exports.kafkaProduceLatency = new prom_client_1.default.Histogram({
    name: 'kafka_produce_latency_ms',
    help: 'Kafka produce latency',
    buckets: [5, 10, 25, 50, 100, 200],
    registers: [exports.register]
});
