#!/bin/bash

docker-compose up -d postgres

# This is the PG password for local development, if
# this script is intended to be ran in a live environment
# we may need to accept password as an argument for this script
export PGPASSWORD="runesapi";

until psql -q -h localhost -U runesapi -d runes -c '\l'; do
  echo >&2 "$(date +%Y%m%dt%H%M%S) Postgres is unavailable - sleeping"
  sleep 1
done
echo >&2 "$(date +%Y%m%dt%H%M%S) Postgres is up - executing command"

npx sequelize-cli db:migrate;
npx sequelize-cli db:seed:all;
