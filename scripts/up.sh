#!/bin/bash

docker-compose up -d;
sh ./scripts/wait-for-postgres.sh;
npm run db:run:migration;