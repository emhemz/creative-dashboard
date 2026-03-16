# Quick Start Guide - Creative Dashboard MVP

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js 18+
- Supabase account (free)

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local with your Supabase credentials
cp .env.local.example .env.local
# Edit .env.local with your keys

# 3. Run development server
npm run dev

# 4. Open http://localhost:3000
```

### Create Your First Account

1. Click "Get Started"
2. Sign up with any email
3. Click the verification link in email
4. Go through 3-step onboarding
5. Create your first project!

## 📦 Project Structure

```
creative-dashboard/
├── app/
│   ├── auth/              → Login, signup, callbacks
│   ├── dashboard/         → Main protected area
│   ├── onboarding/        → First-time user flow
│   └── page.tsx           → Landing page
├── components/
│   ├── dashboard/         → Dashboard widgets
│   ├── ui/                → Reusable components
│   └── theme-provider.tsx → Dark mode support
├── lib/
│   ├── supabase/          → Client & server utilities
│   ├── types.ts           → TypeScript interfaces
│   └── utils.ts           → Helper functions
├── schema.sql             → Database setup script
└── README.md              → Full documentation
```

## 🔧 Key Technologies

| Tech | Purpose |
|------|---------|
| **Next.js 15** | React framework with API routes |
| **TypeScript** | Type-safe development |
| **Supabase** | Database + Auth (PostgreSQL) |
| **Tailwind CSS** | Beautiful styling |
| **Recharts** | Charts & visualizations |
| **Lucide Icons** | 400+ beautiful icons |

## 📱 Core Features Included

✅ Email/password authentication
✅ Project management (CRUD)
✅ Financial tracking (budget/revenue)
✅ Time allocation visualization
✅ Task management
✅ Calendar with deadlines
✅ Dark mode toggle
✅ Responsive design
✅ Settings & integrations
✅ Beautiful onboarding

## 🚀 Ready to Deploy?

See `DEPLOYMENT.md` for:
- Supabase setup
- Vercel deployment
- Environment variables
- Testing checklist
- Troubleshooting

## 🎨 Customization Ideas

### Colors
Edit `tailwind.config.ts` colors

### Logo/Brand
- Landing page: `app/page.tsx`
- Dashboard nav: `components/dashboard/nav.tsx`

### Email Templates
Go to Supabase → Auth → Email Templates

### Database
- View tables: Supabase → SQL Editor
- Modify schema: Update `schema.sql`

## 🐛 Debug Mode

```bash
# Enable verbose logging
npm run dev -- --debug

# Check TypeScript
npm run type-check

# Lint code
npm run lint
```

## 📚 File Reference

| File | Purpose |
|------|---------|
| `schema.sql` | Database tables + RLS policies |
| `lib/types.ts` | TypeScript type definitions |
| `lib/supabase/client.ts` | Browser-side DB client |
| `lib/supabase/server.ts` | Server-side DB client |
| `components/dashboard/nav.tsx` | Top navigation bar |
| `app/auth/signup/page.tsx` | Registration page |
| `app/dashboard/page.tsx` | Main dashboard |
| `app/onboarding/page.tsx` | Onboarding flow |

## 🔑 Default Routes

| Route | Purpose | Auth? |
|-------|---------|-------|
| `/` | Landing page | No |
| `/auth/login` | Sign in | No |
| `/auth/signup` | Register | No |
| `/auth/callback` | OAuth handler | No |
| `/auth/verify-email` | Email confirmation | No |
| `/dashboard` | Main dashboard | Yes ✅ |
| `/dashboard/projects/new` | Create project | Yes ✅ |
| `/dashboard/projects/[id]` | Project details | Yes ✅ |
| `/dashboard/settings` | Settings | Yes ✅ |
| `/onboarding` | First-time setup | Yes ✅ |

## 💡 Pro Tips

1. **Use Supabase URL**: Visit `https://app.supabase.com` to browse database
2. **Test Auth**: Sign up multiple accounts to test multi-user scenarios
3. **Dark Mode**: Theme toggle in settings (System/Light/Dark)
4. **Charts**: Add more chart types from Recharts library
5. **Mobile**: Test on mobile (should be responsive)

## 🚨 Common Issues

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Node modules broken?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Supabase connection failing?**
- Check `.env.local` has correct keys
- Verify Supabase project is active
- Check firewall isn't blocking requests

## ✨ Next Phase Ideas

After MVP works:
1. **Kanban Board** - Drag-drop task management
2. **Team Collaboration** - Share projects with others
3. **Notion Sync** - Two-way integration
4. **Slack Alerts** - Get notifications in Slack
5. **Export Reports** - CSV/PDF downloads
6. **Mobile App** - React Native version
7. **Analytics** - Trends & insights

## 📖 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)

---

**You're all set!** 🎉 Start with `npm install && npm run dev`
