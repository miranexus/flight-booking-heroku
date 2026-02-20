# 🚀 Quick Start Guide

## The Problem You Had
When you tried to call the API from Angular, you got:
```
Http failure response for http://localhost:8080/api/prime-ng-data: 0 Unknown Error
```

## The Reason
**The backend API server was not running.** You need to start TWO servers:
1. Express API Server (port 8080)
2. Angular Dev Server (port 4200)

## The Solution (Just Copy & Paste)

### Step 1: Open PowerShell and run this
```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku\flight-booking-master
.\start-api.ps1
```

This starts the API server. You'll see:
```
Server is running on port 8080.
```

### Step 2: Open a SECOND PowerShell and run this
```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku\flight-booking-master
ng serve --open
```

This starts the Angular app on http://localhost:4200

## Test It
In your browser, check:
- Angular app: http://localhost:4200 ✅
- API health: http://localhost:8080/api/health
- API data: http://localhost:8080/api/prime-ng-data

## The Database Problem

### Current Status
❌ **Database is NOT populating** - Your MySQL host is blocking the connection

### Why
- Your MySQL server at `50.6.161.1` doesn't allow external connections
- The seeding code is ready, but can't reach the database

### How to Fix
Contact your hosting provider and ask them to:
- Allow connections from your machine's IP
- Or allow connections from Heroku's IP range

Once they do, restart the API server and it will auto-seed!

---
That's it! You now have a working local development environment.

