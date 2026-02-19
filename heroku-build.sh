#!/bin/bash
set -e
(
  cd flight-booking-master
  echo "Installing dependencies..."
  npm install --legacy-peer-deps
  echo "Running build..."
  ./node_modules/.bin/ng build --configuration production
  echo "Build complete!"
)

