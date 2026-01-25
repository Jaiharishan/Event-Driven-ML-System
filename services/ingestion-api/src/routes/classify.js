"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const topics_1 = require("../kafka/topics");
const prometheus_1 = require("../metrics/prometheus");
const publish_1 = require("../kafka/publish");
const router = (0, express_1.Router)();
router.post('/classify', async (req, res) => {
    const jobId = (0, uuid_1.v4)();
    const start = Date.now();
    const event = {
        job_id: jobId,
        image_uri: req.body.image_uri,
        model_version: 'v1',
        timestamp: Date.now()
    };
    try {
        await (0, publish_1.publishEvent)(topics_1.Topics.IMAGE_CLASSIFICATION_REQUESTED, jobId, event);
        prometheus_1.requestsCounter.inc();
        prometheus_1.kafkaProduceLatency.observe(Date.now() - start);
        return res.status(202).json({
            job_id: jobId,
            status: 'accepted'
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to enqueue request' });
    }
});
exports.default = router;
//# sourceMappingURL=classify.js.map