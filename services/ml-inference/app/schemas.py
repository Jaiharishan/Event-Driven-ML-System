from dataclasses import dataclass

@dataclass
class ImageClassificationRequested:
    job_id: str
    image_uri: str
    model_version: str
    timestamp: int


@dataclass
class ImageClassificationCompleted:
    job_id: str
    label: str
    confidence: float
    latency_ms: int
    model_version: str


@dataclass
class ImageClassificationFailed:
    job_id: str
    error: str
