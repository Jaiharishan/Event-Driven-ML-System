from prometheus_client import Counter, Histogram

jobs_processed = Counter(
    "ml_jobs_processed_total",
    "Total ML jobs processed"
)

inference_latency = Histogram(
    "ml_inference_latency_seconds",
    "ML inference latency",
    buckets=[0.1, 0.3, 0.5, 1, 2, 5]
)
