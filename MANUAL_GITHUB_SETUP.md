# Manual GitHub Setup - Step by Step

## Step 1: Verify Your GitHub Username

First, I need to know your GitHub username. Is it:
- [ ] fionnrodgers
- [ ] Something else? (please specify)

If unsure, visit https://github.com and check the username shown in your profile.

## Step 2: Create Repository on GitHub (Web Browser)

1. Go to https://github.com/new
2. Sign in if prompted
3. Fill in these details:
   - **Repository name:** `flight-booking-heroku`
   - **Description:** `Flight Booking Application - Angular + Express + MySQL`
   - **Visibility:** ✅ Public
   - **Initialize repository:** ❌ Do NOT check any boxes (keep unchecked)
4. Click the green **"Create repository"** button
5. You should see a page with instructions that start with "Quick setup"

## Step 3: Copy Commands from GitHub

After creating, GitHub shows you commands. You'll see something like:

```
…or push an existing repository from the command line

git remote add origin https://github.com/YOUR_USERNAME/flight-booking-heroku.git
git branch -M main
git push -u origin main
```

## Step 4: Run These Commands (PowerShell)

Open PowerShell and navigate to your project:

```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku
```

Then run these commands (replace YOUR_USERNAME with your actual GitHub username):

```powershell
# If you already have 'origin' remote, remove it first
git remote remove origin

# Add GitHub as origin
git remote add origin https://github.com/YOUR_USERNAME/flight-booking-heroku.git

# Rename master to main (GitHub prefers main)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 5: Verify on GitHub

1. Refresh https://github.com/YOUR_USERNAME/flight-booking-heroku
2. You should see all your files and code
3. Success! 🎉

## Step 6: Update Heroku (Keep Both Synced)

The good news: your Heroku remote is still configured for `master` branch.

Going forward:

```powershell
# Push to GitHub (version control)
git push origin main

# Push to Heroku (deploy)
git push heroku master
```

---

## Issues & Solutions

### "fatal: remote origin already exists"
```powershell
git remote remove origin
# Then continue with git remote add...
```

### "fatal: Authentication failed"
GitHub no longer accepts password authentication for HTTPS. Use one of:
- Personal Access Token (https://github.com/settings/tokens)
- SSH keys (https://github.com/settings/keys)
- GitHub CLI authentication

### "Repository already exists"
If you see this on GitHub creation, it means the repo exists. Just skip to Step 4.

---

## What's Your GitHub Username?

Please confirm your GitHub username so I can update the instructions if needed.

