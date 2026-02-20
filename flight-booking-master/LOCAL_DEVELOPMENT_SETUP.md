# Flight Booking Application - Local Development Setup

## Problem Summary
Your Angular frontend was getting a **"Http failure response... 0 Unknown Error"** when calling the API. This error occurs when:
1. The **backend API server is not running**
2. There are **CORS issues** between the frontend and backend

## Solution

### The Backend API Server Must Be Running

The Flight Booking application has **two separate servers**:

1. **Backend API Server** (Express.js)
   - Port: `8080`
   - Runs on: `http://localhost:8080`
   - Provides data endpoints like `/api/prime-ng-data`

2. **Frontend Dev Server** (Angular)
   - Port: `4200`
   - Runs on: `http://localhost:4200`
   - The UI that calls the API

### How to Start Development

#### Option 1: Using the Development Startup Script (Recommended)
```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku\flight-booking-master
.\start-dev.ps1
```
This will:
- Install dependencies
- Start the API server on port 8080
- Start the Angular dev server on port 4200
- Open the app in your browser

#### Option 2: Start API Server Manually
In a **PowerShell terminal**:
```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku\flight-booking-master
.\start-api.ps1
```

Then in a **second PowerShell terminal**:
```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku\flight-booking-master
ng serve --open
```

#### Option 3: Manual Start (Without Scripts)
Terminal 1 - Start API:
```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku\flight-booking-master
node api/server.js
```

Terminal 2 - Start Angular:
```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku\flight-booking-master
ng serve --open
```

## Verify Everything is Working

### Check API Server
```bash
curl http://localhost:8080/api/health
```
Should return: `{"status":"ok","database":"connected"}` or `{"status":"error","database":"disconnected",...}`

### Check API Data
```bash
curl http://localhost:8080/api/prime-ng-data
```
Should return JSON array of flight booking records

### Check Angular App
Open `http://localhost:4200` in your browser

## Database Issues

### The Database Connection Problem
Your remote MySQL database (at `50.6.161.1`) is **blocking connections from your local machine**. This is why the `db.seedData()` function never executes.

### Solution
The code is set up with a **manual seed endpoint**. Once you fix your database connectivity:

```bash
curl -X POST http://localhost:8080/api/seed
```

This will manually trigger the database seeding.

### Temporary Workaround
If you just want to test the UI without a working database:
1. The API will still return empty arrays `[]` from `/api/prime-ng-data`
2. The UI will load but show no flight bookings
3. This is fine for development and testing

## Database Population

### Current Status
- ✅ Seeding code is ready
- ❌ Database connection is blocked
- ⏳ Waiting for database access fix

### When Database Access is Fixed
1. Restart the API server
2. It will automatically attempt to seed data
3. Or manually call `POST /api/seed` endpoint

### Sample Data Format
The seed function creates 5 sample records:
```json
{
  "title": "Flight Booking System",
  "description": "A comprehensive flight booking application with real-time availability",
  "published": true
}
```

## Important Environment Variables

Located in `api/app/config/db.config.js`:
- `DB_HOST`: 50.6.161.1 (your MySQL server)
- `DB_USER`: sktmfgte_miranexus
- `DB_PASSWORD`: Urumqi@!#781
- `DB_NAME`: sktmfgte_miranexus
- `PORT`: 8080 (API server port)

## Troubleshooting

### "Cannot find module" error
```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku\flight-booking-master
npm install
cd api
npm install
cd ..
```

### Port 8080 already in use
```powershell
netstat -ano | findstr ":8080"
# Kill the process using that port
taskkill /PID <PID> /F
```

### CORS errors in browser console
This is now fixed in the latest version. The CORS configuration allows all localhost origins during development.

### Database seeding not happening
Check if the database is reachable:
```bash
curl http://localhost:8080/api/health
```
If it shows `"database": "disconnected"`, your database connection is the issue.

## Heroku Deployment

The latest version (v20) is deployed to:
- **URL**: https://flight-booking-master-1dc502720c78.herokuapp.com/
- **Status**: ✅ Live and running
- **Database Issue**: Same database connectivity issue exists on Heroku

### To Fix Database on Heroku
1. Configure your MySQL host to allow Heroku's IP addresses
2. Or use a Heroku-hosted database add-on

## Next Steps

1. ✅ Run one of the startup options above
2. ✅ Verify API is running at `http://localhost:8080/api/health`
3. ✅ Open Angular app at `http://localhost:4200`
4. 🔄 Fix database connectivity to enable data population
5. 🔄 Once database works, restart server to trigger auto-seeding

---
Last Updated: 2026-02-20

