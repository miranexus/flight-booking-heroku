#!/bin/bash
set -e
echo "===== HEROKU BUILD STARTING ====="
echo "Root directory contents:"
ls -la | head -20
echo ""
echo "Checking for flight-booking-master:"
if [ -d "flight-booking-master" ]; then
  echo "flight-booking-master directory exists"
  cd flight-booking-master
  echo "Installing dependencies..."
  npm install --force
  echo "Running Angular build..."
  npm run build
  echo "===== BUILD COMPLETE ====="
else
  echo "ERROR: flight-booking-master directory NOT FOUND!"
  ls -la
  exit 1
fi



















