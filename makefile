build:
	docker-compose build

start: build
	docker-compose up facade-service messages-service-1 messages-service-2 rabbitmq  logging-service-1 logging-service-2 logging-service-3

start-quiet: build
	docker-compose up --detach

stop:
	docker-compose down
	docker-compose stop
	docker-compose rm
