#!/bin/bash

sudo docker run \
    --name rift-forum-postgres \
    -e POSTGRES_DB=riftforum_db \
    -e POSTGRES_USER=riftforum_user \
    -e POSTGRES_PASSWORD=riftforum_pass \
    -p 9000:5432 \
    -v $(pwd)/postgres_data:/var/lib/postgresql/data \
    -d \
    postgres:9.6

sudo docker run \
    -d \
    --name rift-forum-node \
    -p 8000:8000 \
    rift-forum-node
