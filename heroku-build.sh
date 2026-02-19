#!/bin/bash
set -e
echo "Initializing git submodules..."
git submodule update --init --recursive || true
echo "Submodule status:"
ls -la flight-booking-master/
cd flight-booking-master
echo "Current directory: $(pwd)"
echo "Installing dependencies..."
npm install
echo "Running build..."
npm run build
echo "Build complete!"
















