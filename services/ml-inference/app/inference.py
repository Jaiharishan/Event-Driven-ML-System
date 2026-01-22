import time
import random

def run_inference(image_uri: str):
    """
    Dummy classifier.
    Replace with real ML later without changing Kafka code.
    """
    start = time.time()

    # simulate compute
    time.sleep(0.05)

    label = random.choice(["cat", "dog", "car"])
    confidence = round(random.uniform(0.8, 0.99), 2)

    latency_ms = int((time.time() - start) * 1000)

    return label, confidence, latency_ms
