#!/bin/bash
set -e
cd flight-booking-master
echo "Current working directory: $(pwd)"
echo "Listing directory contents:"
ls -la | head -20
echo "Installing dependencies with npm..."
npm install --force
echo "Running Angular build..."
npm run build
echo "Build successful!"

















