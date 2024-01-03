db:
	psql -h 0.0.0.0 -p 54320 -U user -d realworld --password

build-m1:
	docker-compose -f docker-compose.m1.yml build && docker-compose -f docker-compose.m1.yml up

m1:
	docker-compose -f docker-compose.m1.yml up

build:
	docker-compose build && docker-compose up

up:
	docker-compose up
