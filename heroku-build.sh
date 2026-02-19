#!/bin/bash
set -e
cd flight-booking-master
echo "Ensuring node_modules directory exists and installing dependencies..."
rm -rf node_modules package-lock.json
npm install
echo "Building application..."
npm run build
echo "Build complete and successful!"











