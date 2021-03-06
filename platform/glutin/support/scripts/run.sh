#!/bin/bash

set -e

HERE=`pwd`

export UI_ROOT=${HERE}/../../../../frontend/ui
export SERVO_RESOURCES=${HERE}/../../../shared/resources

../../target/release/servo \
  --resources-path ${SERVO_RESOURCES} \
  --resolution 720x1280 \
  --user-agent "Mozilla/5.0 (Mobile; rv:60.0) Servo/1.0 Firefox/60.0" \
  -M \
  http://localhost:8000/system/index.html
