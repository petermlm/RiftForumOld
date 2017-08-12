#!/bin/bash

source prepare_db_init.sh

sudo docker build -t rift-forum-node-base -f node-base.docker ..
sudo docker build -t rift-forum-node-dev  -f node-dev.docker ..
sudo docker build -t rift-forum-node-prod -f node-prod.docker ..

sudo docker build -t rift-forum-postgres -f postgres.docker ..
