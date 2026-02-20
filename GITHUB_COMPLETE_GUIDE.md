# 🚀 Complete GitHub Push Guide for miranexus

## Your Setup
- **GitHub Username:** miranexus
- **Repository:** flight-booking-heroku
- **Current Status:** Code ready to push, authentication needed

## What You Need to Do (Two Options)

---

## OPTION A: Using Personal Access Token (Easiest) ✅ RECOMMENDED

### Step 1: Create Token (1 minute)
1. Go to: https://github.com/settings/tokens/new
2. **Token name:** flight-booking
3. **Expiration:** 90 days
4. **Scopes:** Check ✅ `repo`
5. Click **"Generate token"**
6. **COPY the token** and paste it somewhere temporarily

### Step 2: Create Repository on GitHub (1 minute)
1. Go to: https://github.com/new
2. **Repository name:** `flight-booking-heroku`
3. **Description:** Flight Booking Application - Angular + Express + MySQL
4. **Visibility:** ✅ Public
5. **Initialize:** ❌ Don't check anything
6. Click **"Create repository"**

### Step 3: Configure Git (1 minute)

Open PowerShell and run:

```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku

# Configure Windows credential manager
git config --global credential.helper wincred

# Now push (you'll be asked for credentials)
git push -u origin master
```

**When prompted:**
- **Username:** miranexus
- **Password:** Paste your token (the long string from Step 1)

**Done!** Your code is now on GitHub! 🎉

---

## OPTION B: Using SSH Keys (Advanced)

If you have SSH keys already configured:

```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku

# Change remote to SSH
git remote set-url origin git@github.com:miranexus/flight-booking-heroku.git

# Push
git push -u origin master
```

---

## OPTION C: If Token Doesn't Work

Try this simpler approach:

1. Create empty repository on GitHub (https://github.com/new)
2. In PowerShell, run:

```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku

# Just try pushing - you should get a login prompt
git push -u origin master

# A browser window may open - sign in there
```

---

## Verification

After completing above steps:

1. Visit: https://github.com/miranexus/flight-booking-heroku
2. You should see:
   - ✅ All your code files
   - ✅ Folders (api, src, flight-booking-master, etc.)
   - ✅ README.md and other docs
   - ✅ Your commit history

---

## Troubleshooting

### "Repository not found" or "Access denied"
- Check token has `repo` scope
- Check username is `miranexus` (not email)
- Create empty repo first: https://github.com/new

### "Could not authenticate"
- Token might have expired (create new one)
- Check you're pasting token as password, not username
- Try creating repo first, then push

### "fatal: remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/miranexus/flight-booking-heroku.git
git push -u origin master
```

---

## What Happens After Push

Once pushed to GitHub:

```
Your Local Computer          GitHub                    Heroku
     ↓                          ↓                         ↓
   Code ────→ git push origin  miranexus/flight-booking-heroku (Version Control)
                                                           ↓
                                              git push heroku master
                                                           ↓
                                    Live App (Production)
```

You'll have:
- ✅ GitHub as backup/version control
- ✅ Heroku for production deployment
- ✅ Both synced and working together

---

## Next Steps

After successful push to GitHub:

1. ✅ Verify repo exists at https://github.com/miranexus/flight-booking-heroku
2. ✅ Share link with team members
3. ✅ Continue deploying to Heroku with: `git push heroku master`
4. ✅ Keep GitHub and Heroku in sync

---

## Quick Command Reference

```powershell
# After setup, these are your everyday commands:

# Push to GitHub (version control)
git push origin master

# Deploy to Heroku (goes live)
git push heroku master

# Pull latest code
git pull origin master

# Check status
git status

# Commit changes
git add .
git commit -m "Your message"
```

---

## You're Almost There! 🎯

Just need to:
1. Create Personal Access Token (2 minutes)
2. Create empty repo on GitHub (1 minute)
3. Run git push command (1 minute)

**Total Time: ~5 minutes**

Then your code will be visible on GitHub!

