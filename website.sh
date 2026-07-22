#!/bin/sh

set -u

PROJECT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
HOST=${WEBSITE_HOST:-127.0.0.1}
PORT=${WEBSITE_PORT:-4321}

usage() {
  printf 'Usage: %s --start | --stop | --status | --logs\n' "$0"
}

use_project_node() {
  node_major=$(node -p "process.versions.node.split('.')[0]" 2>/dev/null || true)
  [ "$node_major" = 24 ] && return 0

  for node_dir in /opt/homebrew/opt/node@24/bin /usr/local/opt/node@24/bin; do
    candidate_major=$(
      "$node_dir/node" -p "process.versions.node.split('.')[0]" 2>/dev/null || true
    )
    if [ "$candidate_major" = 24 ]; then
      PATH="$node_dir:$PATH"
      export PATH
      return 0
    fi
  done

  printf 'Node 24 is required. Install or activate it, then try again.\n' >&2
  return 1
}

cd "$PROJECT_DIR" || exit 1
use_project_node || exit 1

case ${1:-} in
  --start)
    pnpm dev --background --host "$HOST" --port "$PORT"
    ;;
  --stop|--kill|--end)
    pnpm exec astro dev stop
    ;;
  --status)
    pnpm exec astro dev status
    ;;
  --logs)
    pnpm exec astro dev logs
    ;;
  -h|--help)
    usage
    ;;
  *)
    usage >&2
    exit 2
    ;;
esac
