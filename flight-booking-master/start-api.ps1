# Quick API Server Start Script
# Run this in a separate terminal to start just the API server on port 8080

Write-Host "Starting Flight Booking API Server..." -ForegroundColor Green
Write-Host ""

cd $PSScriptRoot
node api/server.js

