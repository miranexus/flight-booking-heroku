# Heroku Setup Instructions - Alternative Method

## Problem: Heroku CLI Not Installed

If `heroku` command is not recognized, you need to install the Heroku CLI first.

## Solution 1: Install Heroku CLI (Recommended)

### Windows - Using Installer (Easiest)
1. Download from: https://cli-assets.heroku.com/heroku-x64.exe
2. Run the installer
3. Restart your PowerShell/Terminal
4. Verify installation: `heroku --version`
5. Login to Heroku: `heroku login`
6. Then run: `.\setup-heroku.ps1`

### Windows - Using Chocolatey
```powershell
# Install Chocolatey first if you don't have it
choco install heroku-cli

# Restart PowerShell
# Verify
heroku --version
```

### Windows - Using npm
```powershell
npm install -g heroku

# Restart PowerShell
heroku --version
heroku login
```

---

## Solution 2: Manual Setup via Heroku Dashboard (No CLI Needed)

If you don't want to install CLI, use the web dashboard:

1. Go to: https://dashboard.heroku.com/apps/flight-booking-master
2. Click on your app name
3. Go to the **Settings** tab
4. Look for **Config Vars** section
5. Click **Reveal Config Vars**
6. Add these key-value pairs:

   | Key | Value |
   |-----|-------|
   | `DB_HOST` | `50.6.161.1` |
   | `DB_USER` | `sktmfgte_miranexus` |
   | `DB_PASSWORD` | `Urumqi@!#781` |
   | `DB_NAME` | `sktmfgte_miranexus` |

7. Click "Add" for each one
8. Save

Then deploy:
```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku\flight-booking-master
git add .
git commit -m "Configure for Heroku"
git push heroku master
```

---

## Solution 3: After Installing Heroku CLI

Once you install the CLI:

```powershell
# Navigate to your project
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku\flight-booking-master

# Login to Heroku
heroku login

# Set configuration variables
heroku config:set DB_HOST=50.6.161.1 -a flight-booking-master
heroku config:set DB_USER=sktmfgte_miranexus -a flight-booking-master
heroku config:set DB_PASSWORD=Urumqi@!#781 -a flight-booking-master
heroku config:set DB_NAME=sktmfgte_miranexus -a flight-booking-master

# Verify
heroku config -a flight-booking-master

# Deploy
git add .
git commit -m "Configure for Heroku"
git push heroku master

# Watch logs
heroku logs --tail -a flight-booking-master
```

---

## Recommended: Install via Direct Download

1. Download installer: https://cli-assets.heroku.com/heroku-x64.exe
2. Run the .exe file
3. Complete the installation wizard
4. Restart PowerShell completely (close and reopen)
5. Run `heroku --version` to verify
6. Run `heroku login` to authenticate
7. Then you can use `.\setup-heroku.ps1` or manual commands

**Total time: ~5 minutes**

