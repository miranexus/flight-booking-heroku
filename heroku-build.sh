#!/bin/bash
set -e
cd flight-booking-master
echo "Current directory: $(pwd)"
echo "Contents of current directory:"
ls -la | head -20
echo "package.json content:"
head -10 package.json
echo "Installing dependencies..."
npm install
echo "Contents after npm install:"
ls -la | grep node_modules
echo "Running build..."
npm run build
echo "Build complete!"














