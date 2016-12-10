#!/bin/bash

# Create things
psql riftforum_dev < ../database/create.sql
psql riftforum_dev < ../database/views.sql
psql riftforum_dev < ../database/auth.sql
psql riftforum_dev < ../database/topics.sql
psql riftforum_dev < ../database/users.sql

# Insert default data
psql riftforum_dev < ../database/inserts.sql
