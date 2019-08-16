#docker ps -f "name=hifi" --format "{{.Names}}"
docker ps --format "{{.Names}}"
