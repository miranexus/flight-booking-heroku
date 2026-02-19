# Heroku Database Configuration Setup Script for Windows PowerShell
# This script sets all required environment variables in your Heroku app

# Configuration
$APP_NAME = "flight-booking-master"  # Change this to your Heroku app name if different
$DB_HOST = "50.6.161.1"
$DB_USER = "sktmfgte_miranexus"
$DB_PASSWORD = "Urumqi@!#781"
$DB_NAME = "sktmfgte_miranexus"

Write-Host "Setting up Heroku environment variables for: $APP_NAME" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# Check if Heroku CLI is installed
try {
    heroku --version | Out-Null
} catch {
    Write-Host "Error: Heroku CLI is not installed." -ForegroundColor Red
    Write-Host "Please install it from: https://devcenter.heroku.com/articles/heroku-cli" -ForegroundColor Yellow
    exit 1
}

Write-Host "Setting DB_HOST..." -ForegroundColor Yellow
heroku config:set DB_HOST=$DB_HOST -a $APP_NAME

Write-Host "Setting DB_USER..." -ForegroundColor Yellow
heroku config:set DB_USER=$DB_USER -a $APP_NAME

Write-Host "Setting DB_PASSWORD..." -ForegroundColor Yellow
heroku config:set DB_PASSWORD=$DB_PASSWORD -a $APP_NAME

Write-Host "Setting DB_NAME..." -ForegroundColor Yellow
heroku config:set DB_NAME=$DB_NAME -a $APP_NAME

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "✓ Environment variables set successfully!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Verifying configuration..." -ForegroundColor Yellow
heroku config -a $APP_NAME | Select-String "DB_HOST|DB_USER|DB_PASSWORD|DB_NAME"

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Deploy: git push heroku master" -ForegroundColor Cyan
Write-Host "2. Monitor: heroku logs --tail -a $APP_NAME" -ForegroundColor Cyan

