#!/bin/bash

sudo docker run \
    --name rift-forum-postgres \
    -e POSTGRES_DB=riftforum_db \
    -e POSTGRES_USER=riftforum_user \
    -e POSTGRES_PASSWORD=riftforum_pass \
    -p 9000:5432 \
    -d \
    postgres:9.6
