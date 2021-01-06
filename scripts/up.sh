#!/bin/bash

dbPort=5432;

eval "lsof -i:${dbPort} | grep -q LISTEN"
isAllocated=$?

if [ $isAllocated == 1 ]; then
  echo "Port '$dbPort' not yet allocated, starting postgres now.";
  docker-compose up -d;
  sh ./scripts/wait-for-postgres.sh;
else
  echo "Port '$dbPort' already allocated, attemping to re-run migrations.";
fi

npm run db:run:migration
