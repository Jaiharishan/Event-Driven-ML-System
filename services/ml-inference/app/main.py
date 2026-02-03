from app.consumer import start_consumer
from prometheus_client import start_http_server

if __name__ == "__main__":
    print("ML Inference Consumer started")
    start_consumer()
    start_http_server(8000)
