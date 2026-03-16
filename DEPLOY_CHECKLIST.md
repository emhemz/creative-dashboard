# Deployment Checklist - Creative Dashboard

## Before You Deploy

### Step 1: Supabase Setup (5 minutes)

- [ ] Go to https://supabase.com and create account
- [ ] Create new project
  - [ ] Name: `creative-dashboard`
  - [ ] Region: Choose closest to you
  - [ ] Save the password securely
- [ ] Wait for project to initialize (~1 minute)
- [ ] Copy Project URL → save as `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Copy Anon Key → save as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 2: Database Schema (2 minutes)

- [ ] Go to Supabase → SQL Editor
- [ ] Click "New Query"
- [ ] Copy entire contents of `schema.sql` from project root
- [ ] Paste into SQL editor
- [ ] Click "Run"
- [ ] ✅ See "success" message

### Step 3: Local Testing (3 minutes)

```bash
# Create .env.local
cp .env.local.example .env.local

# Edit .env.local and paste your credentials
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

- [ ] Run: `npm install`
- [ ] Run: `npm run dev`
- [ ] Visit `http://localhost:3000`
- [ ] Click "Get Started"
- [ ] Create test account
- [ ] ✅ Verify email works
- [ ] ✅ Complete onboarding
- [ ] ✅ Create test project
- [ ] ✅ All features work locally

### Step 4: GitHub Setup (2 minutes)

- [ ] Go to https://github.com and log in
- [ ] Create new repository
  - [ ] Name: `creative-dashboard` (or your choice)
  - [ ] Description: "Creative project management dashboard"
  - [ ] Make it **Private** (or Public)
  - [ ] Do NOT add README/gitignore (we have them)

- [ ] Go back to terminal:

```bash
cd creative-dashboard

git init
git add .
git commit -m "Initial commit: Creative Dashboard MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/creative-dashboard.git
git push -u origin main
```

- [ ] Verify on GitHub → see all files uploaded

### Step 5: Vercel Deployment (3 minutes)

- [ ] Go to https://vercel.com and log in (sign up if needed)
- [ ] Click "New Project"
- [ ] Select "Import Git Repository"
- [ ] Find your `creative-dashboard` repo → Import
- [ ] **Critical:** Add Environment Variables
  - [ ] Key: `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] Value: (paste from Supabase)
  - [ ] Click Add
  - [ ] Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] Value: (paste from Supabase)
  - [ ] Click Add
- [ ] Click "Deploy"
- [ ] ⏳ Wait ~30 seconds
- [ ] ✅ See "Congratulations! Your project is live"
- [ ] Copy your Vercel URL (e.g., `https://creative-dashboard-123.vercel.app`)

### Step 6: Supabase Auth Config (2 minutes)

This is **critical** for email verification to work!

- [ ] Go to Supabase Dashboard
- [ ] Go to Authentication → URL Configuration
- [ ] Set **Site URL**: `https://your-vercel-url.vercel.app`
- [ ] Set **Redirect URLs**: Add both:
  - `https://your-vercel-url.vercel.app/auth/callback`
  - `https://your-vercel-url.vercel.app/`
- [ ] Click Save

### Step 7: Test Live (5 minutes)

- [ ] Open your Vercel URL in browser
- [ ] ✅ See landing page
- [ ] Click "Get Started"
- [ ] Sign up with new email (not your local test account)
- [ ] Check email inbox for verification link
- [ ] Click verification link
- [ ] ✅ Should redirect to onboarding
- [ ] Complete 3-step onboarding
- [ ] ✅ Create test project
- [ ] ✅ View dashboard
- [ ] ✅ All features work
- [ ] Test dark mode toggle (bottom of settings)
- [ ] ✅ Dark mode works

### Step 8: Smoke Test (3 minutes)

- [ ] Create 3 test projects
- [ ] Edit one project
- [ ] Delete one project
- [ ] Create tasks in a project
- [ ] Mark a task complete
- [ ] ✅ Charts render (time allocation, revenue)
- [ ] ✅ Calendar widget shows deadlines
- [ ] ✅ Settings page loads
- [ ] Test on mobile (resize browser or use phone)
- [ ] ✅ Mobile layout responsive

### Step 9: Clean Up

- [ ] Delete test projects from live app (or keep for demo)
- [ ] Test sign out and sign back in
- [ ] Create final demo account:
  - Email: `demo@creative-dashboard.com` (or similar)
  - Password: Something memorable
  - ✅ Create demo project

### Step 10: Share & Celebrate! 🎉

- [ ] Copy Vercel URL
- [ ] Create demo account for others to test
- [ ] Share with team/friends
- [ ] Get feedback
- [ ] ✅ You're live!

## Post-Deployment

### Monitoring

**Vercel Dashboard:**
- Check deployments are succeeding
- Monitor function execution time
- Watch for any errors

**Supabase Dashboard:**
- Monitor database usage
- Check authentication logs
- Look for any RLS errors

### Optional: Custom Domain

1. Go to Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records (follow Vercel's instructions)
4. Update Supabase auth URL to use custom domain

### Optional: Email Configuration

By default, Supabase uses a shared email sender. For production:

1. Go to Supabase → Authentication → Email Templates
2. Review default templates
3. Customize if desired (requires own email service)

## Troubleshooting

### "Not authenticated" error
- [ ] Check `.env.local` credentials
- [ ] Verify Vercel env vars are set
- [ ] Clear browser cookies → try again

### Email verification not working
- [ ] Check Supabase auth is enabled (Auth → Settings)
- [ ] Verify email provider is configured
- [ ] Check spam folder
- [ ] Check Supabase logs (Auth → Users)

### Charts not rendering
- [ ] Check browser console (F12) for errors
- [ ] Ensure Recharts is installed locally
- [ ] Try hard refresh (Cmd+Shift+R)

### Database connection errors
- [ ] Verify Supabase project is active
- [ ] Check firewall isn't blocking requests
- [ ] Verify `.env` variables are correct
- [ ] Check Supabase logs

### Mobile layout broken
- [ ] Hard refresh browser
- [ ] Clear cache
- [ ] Test in incognito mode
- [ ] Check viewport meta tag in layout

## Success Indicators

You'll know it's working when:

✅ Can sign up new account
✅ Email verification works
✅ Can complete onboarding
✅ Can create projects
✅ Dashboard loads with data
✅ Charts render
✅ Dark mode toggles
✅ Mobile layout works
✅ Settings page loads
✅ Can sign out and back in

## Need Help?

### Common Issues

**Port already in use (local)**
```bash
npm run dev -- -p 3001
```

**Can't connect to Supabase**
- Double-check URL and Key
- Verify project is active on Supabase dashboard
- Check firewall/VPN

**Auth not working after deploy**
- Make sure Supabase auth URLs are updated
- Verify env vars in Vercel are correct
- Check Supabase logs for errors

### Resources

- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Tailwind Docs: https://tailwindcss.com/docs

## Final Checklist

- [ ] Supabase project created
- [ ] Database schema applied
- [ ] Local testing passed
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Supabase auth URLs updated
- [ ] Live testing passed
- [ ] Demo account created
- [ ] Team notified
- [ ] Ready for feedback

---

**Estimated total time: 30 minutes**

You've got this! 🚀
