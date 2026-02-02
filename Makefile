.PHONY: help build up down restart logs ps scale-ingestion scale-ml scale-results clean


COMPOSE=docker compose


help:
	@echo "Available commands:"
	@echo " make build - Build all Docker images"
	@echo " make up - Start all services"
	@echo " make down - Stop all services"
	@echo " make restart - Restart all services"
	@echo " make logs - Tail logs"
	@echo " make ps - List running containers"
	@echo " make scale-ingestion - Scale ingestion API"
	@echo " make scale-ml - Scale ML inference workers"
	@echo " make scale-results - Scale results service"
	@echo " make clean - Remove containers, volumes, networks"


build:
	$(COMPOSE) build


up:
	$(COMPOSE) up -d


down:
	$(COMPOSE) down


restart:
	$(COMPOSE) down && $(COMPOSE) up -d


logs:
	$(COMPOSE) logs -f


ps:
	$(COMPOSE) ps


scale-ingestion:
	$(COMPOSE) up -d --scale ingestion-service=3


scale-ml:
	$(COMPOSE) up -d --scale ml-inference-service=3


scale-results:
	$(COMPOSE) up -d --scale results-service=3


clean:
	$(COMPOSE) down -v --remove-orphans