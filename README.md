# Kafka-Based Image Classification System

This project demonstrates a **production-style, event-driven architecture** for high-throughput image classification using **Apache Kafka**.

It is designed as a **learning + portfolio project** that shows:

* Event-driven design
* Horizontal scalability
* Async ML inference
* Real-world Kafka usage
* Dockerized microservices

---

## 🧠 High-Level Architecture

```
Frontend (Next.js)
      ↓ HTTP
Ingestion API (Node.js)
      ↓ Kafka (produce)
Kafka Topic: image.classification.requested
      ↓ Kafka (consume)
ML Inference Service (Python)
      ↓ Kafka (produce)
Kafka Topic: image.classification.completed
      ↓ Kafka (consume)
Results Service (Node.js)
      ↓ HTTP
Frontend polls results
```

---

## 🧩 Services Overview

### 1. Ingestion API (Node.js)

* Accepts image uploads
* Generates a `jobId`
* Publishes classification request events to Kafka
* Stateless → horizontally scalable

### 2. ML Inference Service (Python)

* Kafka consumer group
* Performs image classification
* Publishes completed / failed events
* Throughput scales with partitions + replicas

### 3. Results Service (Node.js)

* Consumes inference results
* Stores job status in-memory (can be replaced with Redis/DB)
* Exposes polling endpoint

### 4. Kafka

* Message backbone
* Enables decoupling, buffering, and scaling

### 5. Frontend (Next.js)

* Uploads images
* Polls results endpoint
* Displays job status and output

---

## 🗂️ Repository Structure

```
root/
├─ docker-compose.yml
├─ ingestion-api/
│  ├─ Dockerfile
│  ├─ src/
│  └─ package.json
├─ ml-inference/
│  ├─ Dockerfile
│  ├─ app/
│  │  ├─ main.py
│  │  ├─ consumer.py
│  │  ├─ producer.py
│  │  └─ config.py
│  └─ requirements.txt
├─ results-service/
│  ├─ Dockerfile
│  ├─ src/
│  └─ package.json
└─ frontend/
   └─ Next.js app
```

---

## ⚙️ Prerequisites

* Docker
* Docker Compose
* Node.js (for local dev, optional)
* Python 3.10+ (for local dev, optional)

---

## 🚀 Running the System (Docker)

### 1️⃣ Clone the repository

```bash
git clone <repo-url>
cd <repo>
```

### 2️⃣ Build all services

```bash
docker compose build
```

### 3️⃣ Start the system

```bash
docker compose up
```

This will start:

* Kafka + Zookeeper
* Ingestion API → `http://localhost:3000`
* Results Service → `http://localhost:4000`
* Frontend → `http://localhost:3001`
* ML Inference Service (background consumer)

---

## 🔍 Verifying the Setup

### Ingestion API

```bash
curl -X POST http://localhost:3000/api/classify
```

Response:

```json
{
  "jobId": "uuid",
  "status": "accepted"
}
```

### Results API

```bash
curl http://localhost:4000/api/results/<jobId>
```

Response states:

* `pending`
* `completed`
* `failed`

---

## 📈 Scaling the System

### Scale ingestion API

```bash
docker compose up --scale ingestion-api=3
```

### Scale ML inference workers

```bash
docker compose up --scale ml-inference=4
```

⚠️ Ensure Kafka topic partitions ≥ ML replicas.

---

## 📊 Observability (Basic)

The system logs:

* Request rate
* Kafka produce latency
* Inference duration
* End-to-end job latency

Kafka consumer lag can be checked via:

```bash
kafka-consumer-groups --bootstrap-server kafka:9092 \
  --describe --group ml-inference-group
```

---

## 🧪 Stress Testing

Example load test on ingestion API:

```bash
autocannon -c 50 -d 30 http://localhost:3000/api/classify
```

Observe:

* Kafka lag
* Inference throughput
* End-to-end latency

---

## 🧱 Design Principles Used

* Event-driven architecture
* Open/Closed principle
* Async processing
* Backpressure via Kafka
* Horizontal scalability

---

## 🔮 Future Improvements

* Redis for results storage
* Server-Sent Events / WebSockets
* Prometheus + Grafana
* Batch inference
* GPU-aware scheduling
* Dead-letter topics

---

Happy hacking 🚀
