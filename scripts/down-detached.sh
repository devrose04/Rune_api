#!/bin/bash

kill -9 $(cat ./serverless.pid) && rm ./serverless.pid