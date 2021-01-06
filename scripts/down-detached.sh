#!/bin/bash

if [ -f "./serverless.pid" ]; then
  kill -9 $(cat ./serverless.pid) && rm ./serverless.pid
fi