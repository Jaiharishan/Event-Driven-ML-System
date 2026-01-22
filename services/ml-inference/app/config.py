import os

def require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing env var: {name}")
    return value


KAFKA_BROKERS = require_env("KAFKA_BROKERS").split(",")
CONSUMER_GROUP = "ml-inference-group"
