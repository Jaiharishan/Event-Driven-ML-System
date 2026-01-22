import json
from kafka import KafkaProducer
from app.config import KAFKA_BROKERS

producer = KafkaProducer(
    bootstrap_servers=KAFKA_BROKERS,
    value_serializer=lambda v: json.dumps(v).encode("utf-8"),
    key_serializer=lambda k: k.encode("utf-8")
)


def publish(topic: str, key: str, event: dict):
    producer.send(topic, key=key, value=event)
    producer.flush()
