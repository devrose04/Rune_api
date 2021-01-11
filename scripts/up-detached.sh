#!/bin/bash

sh ./scripts/up.sh;

# If a serverless file is found then there is already, likely,
# a running process for the serverless code. In the future perhaps
# we can add a prompt for the user to ask if they'd like to kill it.
if [ -f ./serverless.pid ]; then
    echo "Serverless PID file found. Bringing down process."
    sh ./scripts/down-detached.sh
fi

serverless offline start --useChildProcesses &
echo "$!" > ./serverless.pid