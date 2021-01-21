#!/bin/bash

dbPort=5432;

eval "lsof -i:${dbPort} | grep -q LISTEN"
isAllocated=$?

if [ $isAllocated == 1 ]; then
  echo "Port '$dbPort' not yet allocated, starting postgres now.";
  # The init container will handle the migrations for the first time
  docker-compose up -d postgres runesapi-db-init;
else
  echo "Port '$dbPort' already allocated, attemping to re-run migrations.";
  npm run db:run:migration
fi

