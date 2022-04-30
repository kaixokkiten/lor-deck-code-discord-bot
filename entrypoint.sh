#!/bin/bash

set -euxo pipefail

cp -rT /app/src /app
cd /app

for s in set1 set2 set3 set4 set5; do
  wget https://dd.b.pvp.net/latest/${s}-lite-en_us.zip -q -O /tmp/set.zip
  unzip -j -o /tmp/set.zip en_us/data/${s}-en_us.json
done

npm ci
node protoporo.js
