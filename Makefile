stop:

	sudo docker rm -f bidnow || true

build:
	sudo docker build -t bidnow .	

run: 

	sudo docker run -d -p 8082:3000 --name bidnow bidnow	

.PHONY: build run stop