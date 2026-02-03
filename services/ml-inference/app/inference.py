import time
import random
from app.metrics import jobs_processed, inference_latency

def run_inference(image_uri: str):
    """
    Dummy classifier.
    Replace with real ML later without changing Kafka code.
    """
    start = time.time()

    # run inference
    duration = time() - start

    jobs_processed.inc()
    inference_latency.observe(duration)

    # simulate compute
    time.sleep(0.05)

    label = random.choice(["cat", "dog", "car"])
    confidence = round(random.uniform(0.8, 0.99), 2)

    latency_ms = int((time.time() - start) * 1000)

    return label, confidence, latency_ms
