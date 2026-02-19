#!/bin/bash
set -e
cd flight-booking-master
echo "Installing ALL dependencies (dev + prod)..."
npm install --legacy-peer-deps
echo "Checking if ng exists..."
if [ -f "./node_modules/.bin/ng" ]; then
  echo "ng found!"
else
  echo "ng NOT found, listing node_modules/.bin:"
  ls -la ./node_modules/.bin/ 2>&1 | head -20
fi
echo "Running build via npm script..."
npm run build
echo "Build complete!"










