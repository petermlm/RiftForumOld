#!/bin/bash

sudo docker run \
    -d \
    --name rift-forum-postgres \
    --network=rift-forum-network \
    -v $(pwd)/postgres_data:/var/lib/postgresql/data \
    rift-forum-postgres

postgres_host=$(sudo docker inspect \
    -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' \
    rift-forum-postgres)

sudo docker run \
    -d \
    --name rift-forum-node-prod \
    --network=rift-forum-network \
    -e postgres_host=$postgres_host \
    -p 8002:8000 \
    rift-forum-node-prod
