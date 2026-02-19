# Heroku Deployment Setup Guide

## Prerequisites
- Heroku CLI installed
- Git installed
- Your app already created on Heroku

## Step 1: Set Environment Variables in Heroku

After updating your code, you need to configure the database environment variables in your Heroku app. These variables will be used instead of the local defaults.

### Option A: Using Heroku CLI (Recommended)

Run these commands in your project directory:

```bash
# For your current database (if using the same one)
heroku config:set DB_HOST=50.6.161.1 -a flight-booking-master
heroku config:set DB_USER=sktmfgte_miranexus -a flight-booking-master
heroku config:set DB_PASSWORD=Urumqi@!#781 -a flight-booking-master
heroku config:set DB_NAME=sktmfgte_miranexus -a flight-booking-master
```

Replace `flight-booking-master` with your actual Heroku app name if different.

### Option B: Using Heroku Dashboard

1. Go to [dashboard.heroku.com](https://dashboard.heroku.com)
2. Select your app (`flight-booking-master`)
3. Go to "Settings" tab
4. Click "Reveal Config Vars"
5. Add the following config variables:
   - `DB_HOST` = `50.6.161.1`
   - `DB_USER` = `sktmfgte_miranexus`
   - `DB_PASSWORD` = `Urumqi@!#781`
   - `DB_NAME` = `sktmfgte_miranexus`

## Step 2: Verify Configuration

To verify your environment variables are set correctly:

```bash
heroku config -a flight-booking-master
```

You should see all four database variables listed.

## Step 3: Deploy Your Changes

```bash
# Commit your changes
git add .
git commit -m "Add environment variable support for Heroku database configuration"

# Push to Heroku
git push heroku master
```

## Step 4: Monitor the Deployment

```bash
# View logs in real-time
heroku logs --tail -a flight-booking-master
```

Watch for any database connection errors. The logs should show:
- `Synced db.` - indicating successful database connection
- `Server is running on port <PORT>` - indicating the server started successfully

## Troubleshooting

### Database Connection Errors
If you see connection errors like "PROTOCOL_CONNECTION_LOST" or "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR":

1. **Verify credentials** - Double-check that the DB_HOST, DB_USER, DB_PASSWORD are correct
2. **Check database is running** - Ensure your MySQL database is accessible from the internet
3. **Firewall/IP whitelist** - Make sure your database allows connections from Heroku's IP addresses
4. **Pool settings** - If you need to adjust connection pool settings, modify in `api/app/config/db.config.js`

### Port Binding Error
Heroku automatically sets the PORT environment variable. The app is already configured to use it:
```javascript
const PORT = process.env.PORT || 8080;
```

### Build Failures
If the build still fails:
1. Check logs: `heroku logs --tail -a flight-booking-master`
2. Ensure all dependencies are in `package.json` (not just `api/package.json`)
3. Run locally first: `npm install && npm run build && npm start`

## Local Development

For local development, the app will use the hardcoded database credentials as defaults:
- HOST: `50.6.161.1`
- USER: `sktmfgte_miranexus`
- PASSWORD: `Urumqi@!#781`
- DB: `sktmfgte_miranexus`

If you want to use different credentials locally, create a `.env` file:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_local_password
DB_NAME=flight_booking_local
```

Then load it with dotenv (you'd need to install and use the `dotenv` package).

## Security Note

⚠️ **IMPORTANT**: The database credentials are currently hardcoded as defaults in the code. For better security:

1. **Never commit sensitive credentials to git** - Use `.gitignore` to exclude `.env` files
2. **Consider using a database service** - Heroku's add-ons like JawsDB MySQL or ClearDB provide managed databases
3. **Rotate credentials** - If the current credentials are compromised, change them in your database and update Heroku config vars

## Next Steps

After successful deployment, you can:
1. Test your API endpoints
2. Monitor app performance with `heroku metrics -a flight-booking-master`
3. Scale your app if needed: `heroku ps:scale web=2 -a flight-booking-master`
4. Set up automatic deployments from GitHub for continuous deployment

