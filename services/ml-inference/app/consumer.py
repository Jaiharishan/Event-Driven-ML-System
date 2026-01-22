import json
from kafka import KafkaConsumer
from app.config import KAFKA_BROKERS, CONSUMER_GROUP
from app.inference import run_inference
from app.producer import publish
from app.schemas import (
    ImageClassificationCompleted,
    ImageClassificationFailed
)

REQUEST_TOPIC = "image.classification.requested"
SUCCESS_TOPIC = "image.classification.completed"
FAIL_TOPIC = "image.classification.failed"


def start_consumer():
    consumer = KafkaConsumer(
        REQUEST_TOPIC,
        bootstrap_servers=KAFKA_BROKERS,
        group_id=CONSUMER_GROUP,
        enable_auto_commit=False,
        value_deserializer=lambda v: json.loads(v.decode("utf-8")),
        key_deserializer=lambda k: k.decode("utf-8")
    )

    for message in consumer:
        job_id = message.key
        payload = message.value

        try:
            label, confidence, latency = run_inference(payload["image_uri"])

            event = ImageClassificationCompleted(
                job_id=job_id,
                label=label,
                confidence=confidence,
                latency_ms=latency,
                model_version=payload["model_version"]
            )

            publish(SUCCESS_TOPIC, job_id, event.__dict__)
            consumer.commit()

        except Exception as e:
            event = ImageClassificationFailed(
                job_id=job_id,
                error=str(e)
            )

            publish(FAIL_TOPIC, job_id, event.__dict__)
            consumer.commit()
