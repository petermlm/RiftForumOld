#!/bin/bash

read -p "This will drop everything in the database. Are you sure? [Nn] " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Proceeding..."
else
    echo "Quitting."
    exit 1
fi

# Drop everything
psql riftforum_dev < ../database/drop.sql

# Create things
./create_db.sh

# Insert for testing
psql riftforum_dev < ../database/inserts_testing.sql
