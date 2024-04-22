#!/bin/bash
## This script builds for load testing
#
## Before using, setup a proper url in `target.txt`
## * https://github.com/tsenart/vegeta
#
## Requirements:
## * vegeta
#
## Usage:
#  cd ./scripts/load-testing
## chmod +x start_load_testing.sh
## ./start_load_testing/build.sh
##
## Output: 
#
BASEDIR=$(dirname $0)

TARGET="${BASEDIR}/target.txt"
RATE=2
DURATION="120s"
OUTPUT="${BASEDIR}/output.bin"
WORKERS=5
MAX_WORKERS=10

if [ -f "$OUTPUT" ] ; then
    rm "$OUTPUT"
fi

# start load testing
vegeta attack -targets=$TARGET -rate=$RATE -duration=$DURATION -workers=$WORKERS -max-workers=$MAX_WORKERS > $OUTPUT

RED='\033[1;31m'
NC='\033[0m' # No Color

# basic output
echo -e "${RED}Text output:${NC}"
vegeta report $OUTPUT

echo ""
echo -e "${RED}Histogram output:${NC}"
vegeta report -type='hist[0,10ms,40ms,80ms,200ms,500ms,1000ms]' $OUTPUT
