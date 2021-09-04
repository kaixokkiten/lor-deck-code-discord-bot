#!/bin/bash

set -euxo pipefail

cp -rT /app/src /app
cd /app
npm ci
node protoporo.js
