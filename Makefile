.PHONY: help install dev up down logs clean build test lint

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install dependencies
	yarn install

dev: ## Start development environment
	docker-compose up -d postgres redis
	@echo "Waiting for services to be ready..."
	@sleep 5
	yarn server:dev

up: ## Start all services with Docker Compose
	docker-compose up -d

down: ## Stop all services
	docker-compose down

logs: ## Show logs from all services
	docker-compose logs -f

clean: ## Clean up node_modules and build artifacts
	rm -rf node_modules
	rm -rf packages/*/node_modules
	rm -rf packages/*/dist
	rm -rf packages/*/build
	rm -rf packages/libs/*/node_modules
	rm -rf packages/libs/*/dist

build: ## Build all packages
	yarn build

test: ## Run tests
	yarn test

lint: ## Run linter
	yarn lint

migrate: ## Run database migrations
	yarn prisma:migrate

seed: ## Seed database
	yarn workspace @money-manager/server prisma db seed

studio: ## Open Prisma Studio
	yarn prisma:studio

server-dev: ## Start backend in development mode
	yarn server:dev

mobile-dev: ## Start mobile app
	yarn mobile:start

docker-build: ## Build production Docker image
	docker build -f infra/docker/Dockerfile.server -t money-manager-api .

reset-db: ## Reset database (⚠️  WARNING: Deletes all data)
	@echo "⚠️  WARNING: This will delete all data!"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		yarn workspace @money-manager/server prisma migrate reset; \
	fi
