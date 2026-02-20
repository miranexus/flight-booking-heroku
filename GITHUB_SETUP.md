# How to Push to GitHub

## Quick Setup (Choose One Method)

### Method 1: Using GitHub CLI (Easiest)

If you have GitHub CLI installed (`gh`):

```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku
gh repo create flight-booking-heroku --public --description "Flight Booking Application - Angular + Express + MySQL" --source=. --remote=origin --push
```

That's it! Your code will be on GitHub.

### Method 2: Manual Setup via GitHub Website

**Step 1: Create the repository on GitHub**
1. Go to https://github.com/new
2. Fill in these details:
   - **Repository name:** `flight-booking-heroku`
   - **Description:** `Flight Booking Application - Angular + Express + MySQL`
   - **Visibility:** Public
   - **Initialize repository:** Do NOT check any boxes (we already have code)
3. Click "Create repository"

**Step 2: Add GitHub remote and push**

```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku
git remote add origin https://github.com/YOUR_USERNAME/flight-booking-heroku.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

**Step 3: Verify**
Visit https://github.com/YOUR_USERNAME/flight-booking-heroku in your browser

### Method 3: SSH Setup (If using SSH keys)

If you prefer SSH authentication:

```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku
git remote add origin git@github.com:YOUR_USERNAME/flight-booking-heroku.git
git branch -M main
git push -u origin main
```

## Troubleshooting

### "Remote origin already exists"
```powershell
git remote remove origin
# Then run the setup commands above
```

### "Authentication failed"
Make sure you:
1. Are logged into GitHub in your browser
2. Have set up Personal Access Token if using HTTPS
3. Have SSH keys configured if using SSH

### Need GitHub CLI?
Download from: https://cli.github.com/

## What Gets Pushed

Your entire repository including:
- ✅ Complete Angular frontend code
- ✅ Complete Express backend code
- ✅ All configuration files
- ✅ Documentation (QUICK_START.md, STATUS_REPORT.md, etc.)
- ✅ Git history and commits
- ✅ .gitignore (node_modules won't be uploaded)

## After Pushing

1. ✅ Your code is on GitHub
2. ✅ You can clone it anywhere with: `git clone https://github.com/YOUR_USERNAME/flight-booking-heroku.git`
3. ✅ Share the GitHub link with others
4. ✅ Continue pushing changes with: `git push origin main`
5. ✅ Keep Heroku updated with: `git push heroku main`

## Keep Both Heroku and GitHub in Sync

After initial setup, you have two remotes:

```
origin  -> GitHub (for version control)
heroku  -> Heroku (for deployment)
```

To deploy to Heroku:
```powershell
git push heroku main
```

To push to GitHub:
```powershell
git push origin main
```

To push to both:
```powershell
git push origin main
git push heroku main
```

---

**Your Current Repository**
- Located at: `C:\Users\anaco\Desktop\miranexus\flight-booking-heroku`
- Current remote: Heroku only
- Branch: master (will be renamed to main for GitHub)
- Status: Ready to push to GitHub

