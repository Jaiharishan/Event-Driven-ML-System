type Result =
  | {
      status: 'completed';
      label: string;
      confidence: number;
      latency_ms: number;
      model_version: string;
    }
  | {
      status: 'failed';
      error: string;
    };

const store = new Map<string, Result>();

export function saveResult(jobId: string, result: Result) {
  store.set(jobId, result);
}

export function getResult(jobId: string): Result | undefined {
  return store.get(jobId);
}
