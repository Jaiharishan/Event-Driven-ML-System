import json
from kafka import KafkaProducer
from app.config import KAFKA_BROKERS

_producer = None

# producer = KafkaProducer(
#     bootstrap_servers=KAFKA_BROKERS,
#     value_serializer=lambda v: json.dumps(v).encode("utf-8"),
#     key_serializer=lambda k: k.encode("utf-8")
# )

def get_producer():
    global _producer
    if _producer is None:
        _producer = KafkaProducer(
            bootstrap_servers=KAFKA_BROKERS,
            value_serializer=lambda v: json.dumps(v).encode("utf-8"),
            key_serializer=lambda k: k.encode("utf-8"),
            retries=5
        )
    return _producer


def publish(topic: str, key: str, event: dict):
    producer = get_producer()
    producer.send(topic, key=key, value=event)
    producer.flush()





