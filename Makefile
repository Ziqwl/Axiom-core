.PHONY: start dev build up down logs

start:
	npm start

dev:
	npm run dev

build:
	npm run build

up:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f