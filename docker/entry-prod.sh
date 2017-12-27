#!/bin/bash

# Just wait two seconds before Postgres is ready
sleep 5

# Run migrations and seeds
/package/node_modules/.bin/sequelize db:migrate
/package/node_modules/.bin/sequelize db:seed:all

# Start
npm start
