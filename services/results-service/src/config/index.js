"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    serviceName: 'results-service',
    port: 3000,
    kafka: {
        brokers: ('localhost:9092').split(','),
        clientId: 'results-service'
    }
};
//# sourceMappingURL=index.js.map