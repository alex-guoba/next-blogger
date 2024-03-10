#!/bin/sh

set -e

cd "$(dirname $0)/../.."

echo "start the app"
exec "$@"