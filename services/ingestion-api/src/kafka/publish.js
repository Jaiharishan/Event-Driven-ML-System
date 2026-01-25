"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishEvent = publishEvent;
const producer_1 = require("./producer");
async function publishEvent(topic, key, event) {
    await producer_1.producer.send({
        topic,
        messages: [
            {
                key,
                value: JSON.stringify(event)
            }
        ]
    });
}
//# sourceMappingURL=publish.js.map