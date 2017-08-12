#!/bin/bash

sudo docker kill rift-forum-node-base
sudo docker rm   rift-forum-node-base

sudo docker kill rift-forum-node-dev
sudo docker rm   rift-forum-node-dev

sudo docker kill rift-forum-node-prod
sudo docker rm   rift-forum-node-prod

sudo docker kill rift-forum-postgres
sudo docker rm   rift-forum-postgres

rm init.sql
