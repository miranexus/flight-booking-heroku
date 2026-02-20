# Setup GitHub Repository for Flight Booking Heroku
# Run this script to create a new GitHub repo and push your code

Write-Host "Flight Booking Heroku - GitHub Setup" -ForegroundColor Green
Write-Host ""

# Get GitHub username from user
$GitHubUsername = Read-Host "Enter your GitHub username"

if (-not $GitHubUsername) {
    Write-Host "GitHub username is required!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Creating repository..." -ForegroundColor Cyan

# Create the repository using GitHub CLI
# Make sure you have 'gh' CLI installed and authenticated
# If not, install from: https://cli.github.com/

try {
    # Try using GitHub CLI first
    gh repo create flight-booking-heroku `
        --public `
        --description "Flight Booking Application - Angular + Express + MySQL" `
        --source=. `
        --remote=origin `
        --push

    Write-Host ""
    Write-Host "✅ Repository created and code pushed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository URL: https://github.com/$GitHubUsername/flight-booking-heroku" -ForegroundColor Cyan
    Write-Host ""
}
catch {
    Write-Host ""
    Write-Host "GitHub CLI not available. Proceeding with manual setup..." -ForegroundColor Yellow
    Write-Host ""

    Write-Host "Follow these steps to complete setup:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Go to https://github.com/new" -ForegroundColor Cyan
    Write-Host "2. Create a new repository with name: flight-booking-heroku" -ForegroundColor Cyan
    Write-Host "3. Choose 'Public' visibility" -ForegroundColor Cyan
    Write-Host "4. Do NOT initialize with README (we already have one)" -ForegroundColor Cyan
    Write-Host "5. Click 'Create repository'" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "6. Then run these commands in PowerShell:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku" -ForegroundColor White
    Write-Host "git remote add origin https://github.com/$GitHubUsername/flight-booking-heroku.git" -ForegroundColor White
    Write-Host "git branch -M main" -ForegroundColor White
    Write-Host "git push -u origin main" -ForegroundColor White
    Write-Host ""
    Write-Host "That's it! Your code will be on GitHub." -ForegroundColor Green
}

