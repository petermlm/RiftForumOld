#!/bin/bash

sudo docker build -t rift-forum-node -f node.docker ..
sudo docker build -t rift-forum-postgres -f postgres.docker ..
