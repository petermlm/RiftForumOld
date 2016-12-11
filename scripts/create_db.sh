#!/bin/bash

. config.sh

# Create things
psql $db_name < ../database/create.sql
psql $db_name < ../database/views.sql
psql $db_name < ../database/topics.sql
psql $db_name < ../database/users.sql

# Insert default data
psql $db_name < ../database/inserts.sql
