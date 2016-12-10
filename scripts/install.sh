#!/bin/bash

# Create database
./create_db.sh

# Install node packages
cd ..
npm install

# Edit config files
echo "Edit libs/config"
