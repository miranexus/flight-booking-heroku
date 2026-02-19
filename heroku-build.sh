#!/bin/bash
set -e
echo "Building flight-booking application..."
cd flight-booking-master
npm install --legacy-peer-deps --production=false
npm run build
echo "Build complete!"

