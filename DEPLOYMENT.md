# Deployment Guide - Creative Dashboard MVP

## 🚀 Quick Start Deployment

### Step 1: Setup Supabase (Database & Auth)

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project:
   - Name: `creative-dashboard`
   - Password: Save this somewhere safe
   - Region: Choose closest to you
3. Wait for project to initialize (~1 minute)

### Step 2: Create Database Schema

1. Go to your Supabase project → SQL Editor
2. Click "New Query"
3. Paste the contents of `schema.sql` (in project root)
4. Click "Run"
5. ✅ Tables are created!

### Step 3: Get Supabase Credentials

1. Go to Project Settings → API
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon (public) key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 4: Configure Environment

1. Create `.env.local` in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxxxxx
```

2. Test locally:
```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and create an account!

### Step 5: Deploy to Vercel

#### Option A: Git-Based (Recommended)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repo
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"
7. ✅ Live in ~30 seconds!

#### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts and add environment variables when asked.

### Step 6: Update Supabase Auth URLs

1. Go to Supabase → Authentication → URL Configuration
2. Set **Site URL**: `https://your-vercel-url.vercel.app`
3. Set **Redirect URLs**: 
   - `https://your-vercel-url.vercel.app/auth/callback`
   - `https://your-vercel-url.vercel.app/`

## 📱 Testing the Live App

1. Visit your Vercel URL
2. Click "Get Started" (or sign in if testing)
3. Create an account with any email
4. Verify email (check inbox or spam)
5. Go through onboarding
6. Create your first project!

## 🔐 Security Checklist

- [ ] Supabase RLS policies are enabled (automatic from schema.sql)
- [ ] Environment variables are set in Vercel
- [ ] Auth URLs are configured in Supabase
- [ ] Email domain verification (optional but recommended)

## 🐛 Troubleshooting

### "Not authenticated" error
**Solution:** Clear browser cookies → try again

### "Invalid API key" error
**Solution:** Double-check `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel env vars

### Email verification not working
**Solution:** 
1. Go to Supabase → Authentication → Email Templates
2. Check default template is configured
3. Resend verification email

### Can't create projects
**Solution:** Check database schema was applied (SQL Editor → Run query from schema.sql)

## 📊 Monitoring

### Check Supabase Logs
- Supabase Dashboard → Logs → API Logs
- Look for 401/403 errors (auth issues)
- Check query performance

### Check Vercel Logs
- Vercel Dashboard → Deployments → latest → Logs
- Look for runtime errors
- Monitor page response times

## 🎯 Next Steps

1. **Invite users** - Share your live URL
2. **Create demo account** - For testing:
   - Email: demo@example.com
   - Just sign up once, then you'll have a demo account to use
3. **Collect feedback** - Ask users what features matter most
4. **Build Phase 2** - Based on feedback, add:
   - Kanban board
   - Team collaboration
   - Notion integration
   - Slack notifications

## 🆘 Need Help?

### Common Issues

**Database Error when creating project?**
- Verify schema.sql was run (no errors)
- Check RLS policies are enabled
- Try signing out/in

**Dark mode not working?**
- Clear cache (Cmd+Shift+Delete)
- Hard refresh (Cmd+Shift+R)

**Charts not showing?**
- Check browser console (F12) for errors
- Ensure Recharts dependency installed locally

## 📝 Environment Variables Reference

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxx...

# Optional (for future integrations)
NEXT_PUBLIC_NOTION_API_KEY=ntnxxxxxxxx
```

Never commit `.env.local` to git!

## 🚀 Performance Tips

1. **Database**: Vercel + Supabase in same region (faster queries)
2. **Images**: Use Next.js Image component for optimization
3. **Caching**: Leverage browser cache for static assets
4. **Monitoring**: Check Vercel Analytics for slow pages

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

---

**You're ready to launch! 🎉**
