#!/bin/bash

sudo docker run \
    -d \
    --name rift-forum-postgres \
    --network=rift-forum-network \
    rift-forum-postgres

postgres_host=$(sudo docker inspect \
    -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' \
    rift-forum-postgres)

sudo docker run \
    -d \
    --name rift-forum-node-dev \
    --network=rift-forum-network \
    -e postgres_host=$postgres_host \
    -p 8002:8000 \
    -v $(pwd)/../app.js:/app/app.js \
    -v $(pwd)/../package.json:/app/package.json \
    -v $(pwd)/../libs:/app/libs \
    -v $(pwd)/../public:/app/public \
    -v $(pwd)/../routes:/app/routes \
    -v $(pwd)/../views:/app/views \
    rift-forum-node-dev
