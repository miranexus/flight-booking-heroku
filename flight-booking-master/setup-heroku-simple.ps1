# Simple Heroku Setup Assistant
# This script helps you set up Heroku configuration variables

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Heroku Database Configuration Setup Assistant            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Configuration
$APP_NAME = "flight-booking-master"
$DB_HOST = "50.6.161.1"
$DB_USER = "sktmfgte_miranexus"
$DB_PASSWORD = "Urumqi@!#781"
$DB_NAME = "sktmfgte_miranexus"

Write-Host "Checking for Heroku CLI..." -ForegroundColor Yellow
Write-Host ""

# Try to find heroku command
$herokuPath = $null
try {
    $herokuPath = (Get-Command heroku -ErrorAction Stop).Path
    Write-Host "✓ Heroku CLI found at: $herokuPath" -ForegroundColor Green
} catch {
    Write-Host "✗ Heroku CLI not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "Two ways to proceed:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Option 1: Install Heroku CLI (Recommended)" -ForegroundColor Green
    Write-Host "  • Download from: https://cli-assets.heroku.com/heroku-x64.exe" -ForegroundColor White
    Write-Host "  • Run the installer" -ForegroundColor White
    Write-Host "  • Restart PowerShell" -ForegroundColor White
    Write-Host "  • Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Manual Setup via Web Dashboard" -ForegroundColor Green
    Write-Host "  • Go to: https://dashboard.heroku.com/apps/$APP_NAME" -ForegroundColor White
    Write-Host "  • Click Settings → Config Vars" -ForegroundColor White
    Write-Host "  • Add these variables:" -ForegroundColor White
    Write-Host "    - DB_HOST = 50.6.161.1" -ForegroundColor White
    Write-Host "    - DB_USER = sktmfgte_miranexus" -ForegroundColor White
    Write-Host "    - DB_PASSWORD = Urumqi@!#781" -ForegroundColor White
    Write-Host "    - DB_NAME = sktmfgte_miranexus" -ForegroundColor White
    Write-Host ""
    Write-Host "Then deploy with:" -ForegroundColor Cyan
    Write-Host "  git add ." -ForegroundColor White
    Write-Host "  git commit -m 'Configure for Heroku'" -ForegroundColor White
    Write-Host "  git push heroku master" -ForegroundColor White
    Write-Host ""
    exit 0
}

Write-Host ""
Write-Host "Logging in to Heroku..." -ForegroundColor Yellow
heroku login

Write-Host ""
Write-Host "Setting configuration variables for app: $APP_NAME" -ForegroundColor Cyan
Write-Host ""

Write-Host "Setting DB_HOST..." -ForegroundColor Yellow
heroku config:set DB_HOST=$DB_HOST -a $APP_NAME
Write-Host "✓ DB_HOST set" -ForegroundColor Green

Write-Host ""
Write-Host "Setting DB_USER..." -ForegroundColor Yellow
heroku config:set DB_USER=$DB_USER -a $APP_NAME
Write-Host "✓ DB_USER set" -ForegroundColor Green

Write-Host ""
Write-Host "Setting DB_PASSWORD..." -ForegroundColor Yellow
heroku config:set DB_PASSWORD=$DB_PASSWORD -a $APP_NAME
Write-Host "✓ DB_PASSWORD set" -ForegroundColor Green

Write-Host ""
Write-Host "Setting DB_NAME..." -ForegroundColor Yellow
heroku config:set DB_NAME=$DB_NAME -a $APP_NAME
Write-Host "✓ DB_NAME set" -ForegroundColor Green

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  ✓ All configuration variables set successfully!           ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

Write-Host "Verifying configuration..." -ForegroundColor Yellow
Write-Host ""
heroku config -a $APP_NAME | Select-String "DB_HOST|DB_USER|DB_PASSWORD|DB_NAME" | ForEach-Object { Write-Host "  $_" -ForegroundColor Cyan }

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. git add ." -ForegroundColor White
Write-Host "  2. git commit -m 'Configure for Heroku'" -ForegroundColor White
Write-Host "  3. git push heroku master" -ForegroundColor White
Write-Host "  4. heroku logs --tail -a $APP_NAME" -ForegroundColor White
Write-Host ""
Write-Host "That's it! Your app will be deployed and ready." -ForegroundColor Green

