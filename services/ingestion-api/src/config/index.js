"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    serviceName: 'ingestion-api',
    port: 3000,
    kafka: {
        brokers: ('kafka:9092').split(','),
        clientId: 'ingestion-api'
    }
};
//# sourceMappingURL=index.js.map