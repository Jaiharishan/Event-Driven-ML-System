"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveResult = saveResult;
exports.getResult = getResult;
const store = new Map();
function saveResult(jobId, result) {
    store.set(jobId, result);
}
function getResult(jobId) {
    return store.get(jobId);
}
