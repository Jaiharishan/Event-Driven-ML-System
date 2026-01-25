"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memory_1 = require("../store/memory");
const router = (0, express_1.Router)();
router.get('/results/:jobId', (req, res) => {
    const jobId = req.params.jobId;
    const result = (0, memory_1.getResult)(jobId);
    if (!result) {
        return res.status(404).json({
            status: 'pending'
        });
    }
    return res.json(result);
});
exports.default = router;
//# sourceMappingURL=results.js.map