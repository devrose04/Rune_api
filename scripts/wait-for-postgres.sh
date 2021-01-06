#!/bin/bash

# This is the PG password for local development, if
# this script is intended to be ran in a live environment
# we may need to accept password as an argument for this script
# or read from environment variables.
export PGPASSWORD="runesapi";

until psql -q -h localhost -U runesapi -d runes -c '\l'; do
  echo >&2 "$(date +%I:%M:%S%p) Postgres is unavailable."
  sleep 1
done
echo >&2 "$(date +%I:%M:%S%p) Postgres is now available."