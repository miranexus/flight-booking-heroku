#!/bin/bash
set -e
cd flight-booking-master
echo "Installing dependencies with npm ci..."
npm ci --legacy-peer-deps
echo "Running Angular build..."
npx ng build --configuration production
echo "Build complete!"






