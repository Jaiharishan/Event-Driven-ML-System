"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const consumer_1 = require("./kafka/consumer");
const results_1 = __importDefault(require("./routes/results"));
const config_1 = require("./config");
async function start() {
    console.log("KAFKA_BROKER =", process.env.KAFKA_BROKERS);
    await (0, consumer_1.startConsumer)();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/api', results_1.default);
    app.listen(config_1.config.port, () => {
        console.log(`Result service running on port ${config_1.config.port}`);
    });
}
start().catch(err => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map