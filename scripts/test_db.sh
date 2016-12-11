#!/bin/bash

. config.sh

psql $db_name < ../database/selects.sql
