#!/bin/bash
set -e
cd flight-booking-master
echo "Installing dependencies..."
npm install --legacy-peer-deps --force --no-audit
echo "Running Angular build..."
npx ng build --configuration production
echo "Build complete!"




