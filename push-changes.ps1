# Push script for Git changes
cd "C:\Users\anaco\Desktop\miranexus\flight-booking-heroku"

# Configure Git if needed
git config user.email "user@example.com" 2>$null
git config user.name "Flight Booking User" 2>$null

# Add changes
Write-Output "Adding changes..."
git add flight-booking-master/api/app/config/db.config.js

# Check status before commit
Write-Output "`nGit Status:"
git status

# Commit changes
Write-Output "`nCommitting changes..."
git commit -m "Remove hardcoded sensitive database credentials - use environment variables only"

# Check recent commits
Write-Output "`nRecent commits:"
git log --oneline -3

# Push to GitHub
Write-Output "`nPushing to GitHub (origin/master)..."
git push origin master

# Push to Heroku
Write-Output "`nPushing to Heroku (deploy)..."
git push heroku master

Write-Output "`n✅ All operations completed!"

