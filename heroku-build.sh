#!/bin/bash
set -e
cd flight-booking-master
echo "Installing dependencies with dev packages..."
npm install --legacy-peer-deps
npm ci --only=dev --legacy-peer-deps
echo "Running build..."
npm run build
echo "Build complete!"

