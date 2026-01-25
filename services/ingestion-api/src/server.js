"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const classify_1 = __importDefault(require("./routes/classify"));
const producer_1 = require("./kafka/producer");
const prometheus_1 = require("./metrics/prometheus");
const config_1 = require("./config");
async function start() {
    await (0, producer_1.connectProducer)();
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use('/api', classify_1.default);
    app.get('/metrics', async (_req, res) => {
        res.set('Content-Type', prometheus_1.register.contentType);
        res.end(await prometheus_1.register.metrics());
    });
    app.listen(config_1.config.port, () => {
        console.log(`Ingestion service running on port ${config_1.config.port}`);
    });
}
start().catch(err => {
    console.error('Failed to start service', err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map