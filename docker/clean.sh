#!/bin/bash

sudo docker kill rift-forum-node
sudo docker rm   rift-forum-node

sudo docker kill rift-forum-postgres
sudo docker rm   rift-forum-postgres
