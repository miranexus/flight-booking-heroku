# ⚡ Quick Deployment Checklist for Heroku

## Pre-Deployment Checklist
- [ ] Code changes committed to git
- [ ] No uncommitted changes (`git status`)
- [ ] Heroku CLI installed and logged in (`heroku login`)
- [ ] Heroku app created (`heroku create flight-booking-master`)
- [ ] Remote added (`git remote -v` to verify `heroku` remote exists)

## Deployment Steps

### Step 1: Set Environment Variables (One-Time Setup)
```powershell
# Run the setup script (easiest)
.\setup-heroku.ps1

# OR manually set each variable
heroku config:set DB_HOST=50.6.161.1 -a flight-booking-master
heroku config:set DB_USER=sktmfgte_miranexus -a flight-booking-master
heroku config:set DB_PASSWORD=Urumqi@!#781 -a flight-booking-master
heroku config:set DB_NAME=sktmfgte_miranexus -a flight-booking-master
```

### Step 2: Verify Config Variables
```powershell
heroku config -a flight-booking-master
# Should show: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
```

### Step 3: Deploy
```powershell
git push heroku master
```

### Step 4: Monitor Deployment
```powershell
# Watch logs in real-time
heroku logs --tail -a flight-booking-master

# Look for these success messages:
# - "Synced db." (database connection successful)
# - "Server is running on port <number>" (app started)
```

### Step 5: Test
```powershell
# Open app in browser
heroku open -a flight-booking-master

# Or curl the API
Invoke-WebRequest -Uri "https://flight-booking-master.herokuapp.com/"
```

---

## Useful Commands

```powershell
# View app logs
heroku logs -a flight-booking-master

# View app logs in real-time
heroku logs --tail -a flight-booking-master

# Run a one-off command (useful for database migrations)
heroku run npm run db:migrate -a flight-booking-master

# Check app status
heroku ps -a flight-booking-master

# Restart the app
heroku restart -a flight-booking-master

# View all config variables
heroku config -a flight-booking-master

# Update a config variable
heroku config:set VARIABLE_NAME=value -a flight-booking-master

# Remove a config variable
heroku config:unset VARIABLE_NAME -a flight-booking-master

# Open app in browser
heroku open -a flight-booking-master

# View app info
heroku info -a flight-booking-master
```

---

## Expected Output During Build

```
-----> Building on the Heroku-24 stack
-----> Determining which buildpack to use for this app
-----> Node.js app detected
-----> Creating runtime environment
-----> Installing binaries
-----> Installing dependencies
-----> Build
remote:        Running heroku-postbuild
remote:        > flight-booking-heroku@1.0.0 heroku-postbuild
remote:        > npm run build
remote:        ✔ built successfully
-----> Discovering process types
Procfile declares types -> web
-----> Compressing source files... done.
-----> Launching... done, v<number>
```

---

## If Something Goes Wrong

1. **Check Logs First**: `heroku logs --tail -a flight-booking-master`

2. **Common Issues:**

   | Error | Solution |
   |-------|----------|
   | `npm error Missing script: "build"` | Ensure `heroku-postbuild` is in package.json scripts |
   | `Failed to sync db` | Check DB_HOST, DB_USER, DB_PASSWORD in config vars |
   | `PROTOCOL_CONNECTION_LOST` | Database unreachable - verify IP whitelist |
   | `Port already in use` | App is trying to use hardcoded port; should use PORT env var |
   | `Cannot find module` | Missing dependency in package.json |

3. **Reset and Redeploy**:
   ```powershell
   # If needed, clear Heroku cache
   heroku plugins:install heroku-builds
   heroku builds:cache:purge -a flight-booking-master
   git push heroku master
   ```

4. **Get Help**:
   - Review logs: `heroku logs --tail -a flight-booking-master`
   - Check Heroku Status: https://status.heroku.com
   - Read HEROKU_SETUP.md in your project for detailed troubleshooting

---

## After Successful Deployment

- [ ] Visit https://flight-booking-master.herokuapp.com in browser
- [ ] Test API endpoints
- [ ] Verify database is syncing (`Synced db.` in logs)
- [ ] Set up monitoring (optional): `heroku addons:create newrelic:wayne`
- [ ] Consider GitHub integration for auto-deploy on push
- [ ] Set up Heroku Postgres or JawsDB if not using remote database

---

## Files Modified/Created

✅ **Modified:**
- `package.json` - Added `heroku-postbuild` script
- `api/app/config/db.config.js` - Environment variable support
- `api/server.js` - Improved CORS configuration

✅ **Created:**
- `HEROKU_SETUP.md` - Complete setup guide
- `setup-heroku.ps1` - PowerShell automation script
- `setup-heroku.sh` - Bash automation script  
- `.env.example` - Environment variables template
- `DEPLOYMENT_CHECKLIST.md` - This file

---

**Version**: 1.0  
**Last Updated**: February 19, 2026  
**Status**: Ready for Deployment ✅

