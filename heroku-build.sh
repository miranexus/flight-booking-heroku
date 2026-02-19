#!/bin/bash
set -e
cd flight-booking-master
echo "Installing dependencies..."
npm install --legacy-peer-deps --production=false
echo "Running ng build..."
npx ng build --configuration production
echo "Build complete!"

