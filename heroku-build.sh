#!/bin/bash
set -e
(
  cd flight-booking-master
  echo "Installing dependencies with dev packages..."
  npm install --legacy-peer-deps --save-dev
  npm install --legacy-peer-deps
  echo "Listing ng binary location..."
  ls -la node_modules/.bin/ | grep ng
  echo "Running build..."
  ./node_modules/.bin/ng build --configuration production
  echo "Build complete!"
)

