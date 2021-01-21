#!/bin/sh

main() {
  usage() { echo "Usage: $0 [-d <string*>] [-t <string*>] [-u <string*>] [-p <string*>] [-m <number>] [-h <string>]" 1>&2; exit 1; }

  while getopts ":h:d:t:u:p:m:" o; do
      case "${o}" in
          u)
            u=${OPTARG}
            ;;
          p)
            p=${OPTARG}
            ;;
          d)
            d=${OPTARG}
            ;;
          t)
            t=${OPTARG}
            ;;
          h)
            h=${OPTARG}
            ;;
          m)
            m=${OPTARG}
            ;;
      esac
  done
  shift $((OPTIND-1))

  if [ -z "${d}" ]; then
    echo 'Missing flag "-d", please provide a database name.'
    usage
  fi

  if [ -z "${t}" ]; then
    echo 'Missing flag "-t", please provide a table name.'
    usage
  fi
  if [ -z "${u}" ]; then
    echo 'Missing flag "-u", please provide a username.'
    usage
  fi
  if [ -z "${p}" ]; then
    echo 'Missing flag "-p", please provide a password.'
    usage
  fi

  if [ -z "${h}" ]; then
    h="localhost"
  fi

  sh ./scripts/wait-for-postgres.sh -d $d -t $t -u $u -p $p -h $h -m $m
  export TYPEORM_URL="postgres://${u}:${p}@${h}/${t}"
  npm run db:run:migration
}

main "$@"
