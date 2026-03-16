# Creative Dashboard MVP

A beautiful, full-stack web app for managing creative projects with revenue tracking, time allocation, and task management.

## 🚀 Features

- **Auth System** - Email/password authentication via Supabase
- **Project Management** - Create, edit, and delete projects with full details
- **Financial Tracking** - Budget and revenue tracking per project
- **Visualizations** - Pie charts for time allocation, bar charts for revenue
- **Task Management** - Create and track tasks with deadlines and priorities
- **Calendar Widget** - View upcoming deadlines at a glance
- **Dark Mode** - Full dark mode support with theme switcher
- **Notion Integration** - Proof-of-concept for syncing Notion pages
- **Responsive Design** - Mobile-friendly UI
- **Onboarding Flow** - Delightful step-by-step setup

## 🛠 Tech Stack

- **Framework**: Next.js 15+ with App Router & TypeScript
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **UI Components**: Custom + Radix UI
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+
- Supabase account (free tier works!)
- Vercel account (for deployment)

## 🔧 Local Setup

### 1. Clone and Install

```bash
npm install
```

### 2. Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Go to SQL Editor and run `schema.sql` to create the database schema
3. Get your credentials:
   - Project URL
   - Anon Key (public)

### 3. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
creative-dashboard/
├── app/
│   ├── auth/              # Auth pages (login, signup, callback)
│   ├── dashboard/         # Protected dashboard routes
│   ├── onboarding/        # Onboarding flow
│   ├── layout.tsx         # Root layout with theme
│   ├── page.tsx           # Landing page
│   └── globals.css        # Global styles
├── components/
│   ├── dashboard/         # Dashboard-specific components
│   │   ├── nav.tsx
│   │   ├── projects-grid.tsx
│   │   ├── time-allocation-chart.tsx
│   │   ├── revenue-tracker.tsx
│   │   ├── task-list.tsx
│   │   └── calendar-widget.tsx
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   └── theme-provider.tsx # Dark mode provider
├── lib/
│   ├── supabase/          # Supabase clients
│   │   ├── client.ts      # Browser client
│   │   └── server.ts      # Server client
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utility functions
├── schema.sql             # Database schema
└── tailwind.config.ts     # Tailwind configuration
```

## 🎯 Pages

### Public
- `/` - Landing page
- `/auth/login` - Sign in
- `/auth/signup` - Create account
- `/auth/verify-email` - Email verification
- `/auth/callback` - Auth callback

### Protected
- `/dashboard` - Main dashboard with all widgets
- `/dashboard/projects/new` - Create new project
- `/dashboard/projects/[id]` - Project details
- `/dashboard/settings` - Settings & integrations
- `/onboarding` - First-time setup

## 📊 Dashboard Sections

1. **Projects Grid** - Card-based view of all projects
2. **Time Allocation** - Pie chart showing energy distribution
3. **Revenue Tracker** - Bar chart + financial summary
4. **Task List** - Recent/pending tasks from all projects
5. **Calendar Widget** - Upcoming deadlines

## 🚀 Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repo
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click Deploy

Your app will be live in seconds!

## 🔑 Demo Credentials

After deploying, you can:
1. Create an account at `/auth/signup`
2. Go through onboarding
3. Start adding projects!

Or create a demo account for testing:
- Email: `demo@example.com`
- Password: `Demo123!@`

(You'll need to manually create this in Supabase after setup)

## 🧩 Next Steps / Future Features

- **Kanban Board** - Drag-and-drop task management
- **Calendar View** - Full month/week calendar
- **Notion Integration** - Full two-way sync
- **Slack Notifications** - Get updates in Slack
- **Export** - CSV/PDF reports
- **Collaboration** - Share projects with team members
- **Activity Log** - Track all changes
- **Search** - Full-text search across projects
- **Mobile App** - React Native version
- **Analytics** - Advanced insights and trends

## 🐛 Troubleshooting

### "Not authenticated" error
- Make sure you're signed in
- Check if Supabase credentials are correct
- Verify RLS policies in Supabase

### Charts not rendering
- Ensure Recharts is installed: `npm install recharts`
- Check browser console for errors

### Dark mode not working
- Clear browser cache
- Check if theme provider is in layout.tsx

## 📝 Notes

- All data is stored in Supabase with Row-Level Security
- Each user can only see their own projects
- The app is fully responsive (mobile, tablet, desktop)
- Dark mode uses system preference by default

## 📄 License

MIT

---

Built with ❤️ for creative builders
