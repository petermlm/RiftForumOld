#!/bin/bash

# Drop everything
psql riftforum_dev < ../database/drop.sql

# Create things
psql riftforum_dev < ../database/create.sql
psql riftforum_dev < ../database/views.sql
psql riftforum_dev < ../database/auth.sql
psql riftforum_dev < ../database/topics.sql

# Insert for testing
psql riftforum_dev < ../database/inserts.sql
