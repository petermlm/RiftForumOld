# Docker Files

There is a docker file for the node container and for the postgres container.

## Node

The docker file for node is based on Ubuntu 16.04 LTS. It installs node and
npm. It also installs `nodemon` which is only used for development.

The node modules are installed in the directory:

    /package.json

Because of this, node needs to following environment variable to run:

    NODE_PATH=/package/node_modules

The `package.json` file is copied from `/app` to `/package`.

The `/app` directory contains the whole repository.

## Postgres

This docker is based on postgres 9.6 and defines three things:

 * Database name
 * Database user
 * Database pass

# Docker Compose

The docker compose files are used to build and run the containers. There are
two files:

 * `docker-compose-prod.sh`
 * `docker-compose-dev.sh`

## Production

The production file is to be used in production so the database is persistent.
The mapped directory with the postgres data is:

    REPO/docker/data

The node image uses the entry point `entry-prod.sh` which simply runs:

    npm start

## Development

The development file is to be used while developing. The database is not
persistent.

The whole directory gets mapped to `/app`, and the entry point for node is the
file `entry-dev.sh` which runs the:

    nodemon nom start

Because of this two things, every change done to a file will restart node.

## Build

Use the following commands to build:

    sudo docker-compose -f docker-compose-prod.yml build
    sudo docker-compose -f docker-compose-dev.yml build

To run:

    sudo docker-compose -f docker-compose-prod.yml up
    sudo docker-compose -f docker-compose-dev.yml up

To tear down:

    sudo docker-compose -f docker-compose-prod.yml down
    sudo docker-compose -f docker-compose-dev.yml down
