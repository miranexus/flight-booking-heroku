#!/bin/bash
set -e
cd flight-booking-master
echo "Cleaning npm cache..."
npm cache clean --force
echo "Removing node_modules..."
rm -rf node_modules
echo "Installing dependencies..."
npm install --legacy-peer-deps --no-cache
echo "Running Angular build..."
npm exec ng -- build --configuration production
echo "Build complete!"


