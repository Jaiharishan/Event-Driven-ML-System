export interface ImageClassificationCompletedEvent {
  job_id: string;
  label: string;
  confidence: number;
  latency_ms: number;
  model_version: string;
}

export interface ImageClassificationFailedEvent {
  job_id: string;
  error: string;
}
