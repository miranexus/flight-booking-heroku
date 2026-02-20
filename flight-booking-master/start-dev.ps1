# Development startup script for flight-booking
# This starts both the Angular dev server and the backend API server

Write-Host "=== Flight Booking Development Setup ===" -ForegroundColor Green
Write-Host ""

# Check if Node is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

Write-Host "Node version:" -ForegroundColor Cyan
node --version

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Cyan

# Install root dependencies
npm install --save-dev

# Install API dependencies
cd api
npm install
cd ..

Write-Host ""
Write-Host "Starting servers in background..." -ForegroundColor Cyan
Write-Host ""

# Start API server in background
Write-Host "Starting API server on port 8080..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd '$PWD'; node api/server.js" -WindowStyle Normal

# Wait a moment for API server to start
Start-Sleep -Seconds 2

# Start Angular dev server
Write-Host "Starting Angular dev server on port 4200..." -ForegroundColor Yellow
Write-Host ""
Write-Host "=== Servers Starting ===" -ForegroundColor Green
Write-Host "API:     http://localhost:8080" -ForegroundColor Cyan
Write-Host "Angular: http://localhost:4200" -ForegroundColor Cyan
Write-Host "Health:  http://localhost:8080/api/health" -ForegroundColor Cyan
Write-Host ""

ng serve --open

