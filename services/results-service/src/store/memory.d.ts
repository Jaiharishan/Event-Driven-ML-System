type Result = {
    status: 'completed';
    label: string;
    confidence: number;
    latency_ms: number;
    model_version: string;
} | {
    status: 'failed';
    error: string;
};
export declare function saveResult(jobId: string, result: Result): void;
export declare function getResult(jobId: string): Result | undefined;
export {};
//# sourceMappingURL=memory.d.ts.map