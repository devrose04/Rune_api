#!/bin/bash
docker-compose up -d postgres && sh "$(PWD)/scripts/wait-for-postgres.sh"

npx sequelize-cli db:migrate;
npx sequelize-cli db:seed:all;
