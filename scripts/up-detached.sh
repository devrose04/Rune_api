#!/bin/bash

sh ./scripts/up.sh;

# If a serverless file is found then there is already, likely,
# a running process for the serverless code. In the future perhaps
# we can add a prompt for the user to ask if they'd like to kill it.
if [ -f ./serverless.pid ]; then
    echo "Serverless PID file found.."

    while true
    do
    read -p "Would you like to stop the current running instance? [y] " answer
    answer=${answer:-y}

    case $answer in
    [yY]* ) echo -e '\nStopping running serverless process\n'
            sh ./scripts/down-detached.sh
            break;;
    [nN] )  break;;
    * )     echo "Please enter Y or N.";
            break;;
    esac
    done

fi

serverless offline start --useChildProcesses &
echo "$!" > ./serverless.pid