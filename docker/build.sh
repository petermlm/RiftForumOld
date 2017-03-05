#!/bin/bash

cat \
    ../database/create.sql \
    ../database/views.sql \
    ../database/topics.sql \
    ../database/users.sql \
    ../database/inserts.sql \
    ../database/inserts_testing.sql \
    > init.sql

sudo docker build -t rift-forum-node -f Dockerfile.node ..
sudo docker build -t rift-forum-postgres -f Dockerfile.postgres ..
