# 📖 LifeLesson — Frontend

> *Preserve the wisdom you've gained through life's experiences.*

LifeLesson is a community-driven platform where people write, share, and discover real-life lessons — personal growth insights, mindset shifts, relationship wisdom, and more. The frontend is built with **Next.js 16** and delivers a fast, modern, dark-themed experience for readers and contributors alike.

---

## 🌐 Live Preview

| Page | Description |
|------|-------------|
| `/` | Home — hero, featured lessons, why it matters, discover section |
| `/public-lessons` | Community Wisdom — browse & filter all public lessons |
| `/pricing` | Pricing — Free vs Premium comparison + FAQ |
| `/dashboard` | User dashboard — overview, add lesson, my lessons, favorites, profile |
| `/dashboard/add-lesson` | Create & publish a new life lesson |
| `/lessons/[id]` | Lesson detail — full content, engagement, related lessons, comments |
| `/profile/[id]` | Public contributor profile — lessons, stats, badges |

---

## ✨ Key Features

### For All Users
- 🏠 **Curated Home Feed** — Featured lessons hand-picked for depth, utility, and resonance
- 🔍 **Community Wisdom Page** — Search by title, filter by category, emotional tone, and sort order
- 📖 **Lesson Detail View** — Full lesson content with engagement (likes, saves, shares), comments, and related lessons
- 👤 **Public Profiles** — View any contributor's lessons, stats (views, likes, saves), and category badges
- 💡 **Why It Matters Section** — Reflection, Community, Legacy, Clarity pillars explained on the homepage
- 🌙 **Dark / Light Mode** toggle

### For Registered Users
- ✍️ **Write & Publish Lessons** — Title, full description, category, emotional tone, featured image, visibility toggle (public/private), and access level (free/premium)
- ❤️ **Save Favorites** — Bookmark lessons you want to revisit
- 💬 **Comment** — Engage with the community on lesson detail pages
- 📊 **Personal Dashboard** — Track your lessons, views, likes, and saves
- 🏷️ **Free vs Premium Access** — Free users can create up to 10 lessons; Premium unlocks unlimited lessons, community badge, priority support.

### For Admin Users *(3 Extra Controls)*
Admins get all standard user features **plus** a dedicated admin sidebar with:

| Admin Panel | What It Does |
|---|---|
| 👥 **Manage Users** | View all registered users, their roles, plan status, and activity |
| 📋 **Manage Lessons** | Approve, edit, or remove any public lesson on the platform |
| 🚩 **Reported Lessons** | Review flagged/reported content and take moderation action |

The admin dashboard also shows platform-wide analytics: total users, public lessons, reported content, new lessons today, lesson growth chart, user growth chart, and a leaderboard of most active contributors.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [React 19](https://react.dev/) | UI rendering |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) | Accessible component primitives |
| [Better Auth](https://better-auth.com/) | Authentication |
| [Recharts](https://recharts.org/) | Dashboard analytics charts |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Form handling & validation |
| [Stripe](https://stripe.com/) | Premium plan payment checkout |
| [Embla Carousel](https://www.embla-carousel.com/) | Homepage carousels |
| [React Dropzone](https://react-dropzone.js.org/) | Featured image upload |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| [date-fns](https://date-fns.org/) | Date formatting |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark/light mode |
| [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) | Icon sets |
| [MongoDB](https://www.mongodb.com/) | Database client (shared with backend) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A running instance of the [LifeLesson Backend](#) (see backend README)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/lifelesson-frontend.git
cd lifelesson-frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your values (see Environment Variables below)

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
BETTER_AUTH_SECRET=your-better-auth-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SERVER_URL=https:http://localhost:8000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

STRIPE_SECRET_KEY=your-stripe-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

NEXT_PUBLIC_IMGBB_API_KEY=your-imagebb-api-key
MONGODB_URI=your-mongodb-uri
```

### Build for Production

```bash
npm run build
npm start
```

---

## 🎨 Design System

- **Color Scheme:** Dark-first (`#000` / `#111` backgrounds, white text, amber/gold accents)
- **Typography:** Bold italic lesson titles, clean sans-serif body
- **Cards:** Rounded dark cards with subtle borders, category badge chips, and engagement stats
- **Badges:** `PREMIUM` (amber), `FREE` (blue/gray), category tags (color-coded by type)

---

## 👥 User Roles

| Role | Capabilities |
|------|-------------|
| **Guest** | Browse public lessons |
| **User** | All guest features + write lessons, comment, like, save, manage own profile |
| **Admin** | All user features + manage users, manage all lessons, review reported content, platform dashboard |

---

<p align="center">Thanks for yout time</p>

