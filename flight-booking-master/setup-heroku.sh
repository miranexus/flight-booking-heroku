#!/bin/bash
# Heroku Database Configuration Setup Script
# This script sets all required environment variables in your Heroku app

# Configuration
APP_NAME="flight-booking-master"  # Change this to your Heroku app name if different
DB_HOST="50.6.161.1"
DB_USER="sktmfgte_miranexus"
DB_PASSWORD="Urumqi@!#781"
DB_NAME="sktmfgte_miranexus"

echo "Setting up Heroku environment variables for: $APP_NAME"
echo "================================================"

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "Error: Heroku CLI is not installed. Please install it first."
    echo "Visit: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

echo "Setting DB_HOST..."
heroku config:set DB_HOST="$DB_HOST" -a "$APP_NAME"

echo "Setting DB_USER..."
heroku config:set DB_USER="$DB_USER" -a "$APP_NAME"

echo "Setting DB_PASSWORD..."
heroku config:set DB_PASSWORD="$DB_PASSWORD" -a "$APP_NAME"

echo "Setting DB_NAME..."
heroku config:set DB_NAME="$DB_NAME" -a "$APP_NAME"

echo ""
echo "================================================"
echo "✓ Environment variables set successfully!"
echo "================================================"
echo ""
echo "Verifying configuration..."
heroku config -a "$APP_NAME" | grep -E "DB_HOST|DB_USER|DB_PASSWORD|DB_NAME"

echo ""
echo "Next steps:"
echo "1. Deploy: git push heroku master"
echo "2. Monitor: heroku logs --tail -a $APP_NAME"

