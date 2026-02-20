# GitHub Authentication Setup for Push

## The Problem
GitHub no longer accepts password authentication via HTTPS. You need to use either:
1. **Personal Access Token (Easiest)** ← Recommended
2. SSH keys
3. GitHub CLI

## Solution: Use Personal Access Token (5 minutes)

### Step 1: Create a Personal Access Token on GitHub

1. Go to: https://github.com/settings/tokens/new
2. Sign in if needed
3. Fill in the form:
   - **Token name:** `flight-booking-push`
   - **Expiration:** 90 days (or whatever you prefer)
   - **Scopes:** Check only `repo` (includes all repo access)
4. Click **"Generate token"**
5. **COPY THE TOKEN** - You'll only see it once! Paste it somewhere safe for now.

### Step 2: Configure Git to Use Token

Run these commands in PowerShell:

```powershell
cd C:\Users\anaco\Desktop\miranexus\flight-booking-heroku

# Configure git credential helper to store your token
git config --global credential.helper wincred

# Tell git to use the token for GitHub
# Run this and paste your token when prompted
git push -u origin master
```

When prompted for username/password:
- **Username:** `miranexus`
- **Password:** Paste your Personal Access Token (NOT your GitHub password)

### Step 3: Verify Push Succeeded

After running the push command:
1. Check your GitHub: https://github.com/miranexus/flight-booking-heroku
2. You should see all your files
3. Done! 🎉

---

## If That Doesn't Work

Try this alternative approach using an environment variable:

```powershell
# Set token temporarily
$env:GIT_ASKPASS = "powershell -Command Write-Host"
$env:GIT_ASKPASS_RESULT = "YOUR_TOKEN_HERE"

# Replace YOUR_TOKEN_HERE with your actual token

# Try push again
git push -u origin master
```

---

## Need Help?

The issue is that your local git doesn't have GitHub credentials configured.

**Quickest Fix:**
1. Create token above
2. Run: `git push -u origin master`
3. Enter username: `miranexus`
4. Enter password: Your token

That's it!

