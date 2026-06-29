# 🔧 LifeLesson — Backend

> *The API powering a platform for real life wisdom.*

This is the **Express.js REST API** for LifeLesson — a community platform where users write, share, and discover meaningful life lessons. The backend handles authentication, lesson management, user roles, engagement (likes, saves, comments), premium access via Stripe, and admin moderation tools.

---

## 📡 What This Server Does

- **Authentication** — Secure sign-up, login, and session management via Better Auth
- **Lesson CRUD** — Create, read, update, delete lessons with visibility and access level controls
- **Community Features** — Likes, saves, comments, follow/unfollow contributors
- **User Profiles** — Public profile data, activity stats, and badge tracking
- **Premium Payments** — Stripe checkout for one-time lifetime premium upgrade
- **Admin Moderation** — User management, lesson moderation, and reported content review
- **Analytics** — Platform-wide lesson growth, user growth, and contributor leaderboard data

---

## ✨ Key Features

### Authentication & Users
- Email/password registration and login using **Better Auth**
- JWT-based session verification via **jose**
- Role-based access: `user` and `admin`
- Profile updates (display name, avatar)
- Email verification status tracking

### Lessons
- Create lessons with: title, full description, category, emotional tone, featured image, visibility (public/private), and access level (free/premium)
- Free users: up to **10 lessons**; Premium users: **unlimited**
- Fetch paginated public lessons with filters (category, emotional tone, sort)
- Featured lessons (hand-curated or algorithmic)
- Related lessons by category

### Engagement
- ❤️ Like / unlike lessons
- 🔖 Save / unsave lessons to favorites
- 💬 Post and fetch comments per lesson
- 📤 Share tracking
- 🚩 Report inappropriate lessons

### Premium
- Stripe one-time payment integration (lifetime premium, ৳1500 BDT)
- Webhook handling to update user plan on successful payment
- Premium gates: access premium lessons, export as PDF, ad-free badge, priority support

### Admin Controls *(3 Extra Endpoints/Modules)*

| Module | Capabilities |
|--------|-------------|
| 👥 **Manage Users** | List all users, view roles & plans, promote/demote, ban/unban |
| 📋 **Manage Lessons** | View, approve, edit, or delete any lesson on the platform |
| 🚩 **Reported Lessons** | Review flagged lessons, dismiss reports, or remove content |

Admin-only routes are protected by middleware that verifies both authentication and `admin` role.

### Analytics (Admin Dashboard)
- Total users, public lessons, reported count, new lessons today
- Time-series data for lesson growth and user growth charts
- Most active contributors ranked by published lessons

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Express.js 5](https://expressjs.com/) | Web framework |
| [MongoDB](https://www.mongodb.com/) | Database |
| [Mongoose 9](https://mongoosejs.com/) | ODM for MongoDB |
| [Better Auth](https://better-auth.com/) | Authentication |
| [jose](https://github.com/panva/jose) | JWT verification |
| [Zod](https://zod.dev/) | Request validation |
| [cors](https://github.com/expressjs/cors) | Cross-origin resource sharing |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)
- Stripe account (for payment features)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/devsWithRafi/LifeLession.git
cd LifeLession/server

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your values (see Environment Variables below)

# 4. Start the development server
npm run dev
```

Server runs on [http://localhost:8000](http://localhost:8000) by default.

### Environment Variables

```env
PORT=8000
BETTER_AUTH_SECRET=your-better-auth-secret
BETTER_AUTH_URL=http://localhost:3000
CLIENT_URL=http://localhost:3000
MONGODB_URI=your-mongodb-uri
```

---

---

## 🗺️ API Overview


### Lessons
```http
POST   /api/lesson/create               # Create a new lesson
GET    /api/lesson/all                  # Get all public lessons
GET    /api/lesson/featured             # Get featured lessons
GET    /api/lesson/my-lessons           # Get logged-in user's lessons
GET    /api/lesson/top-contributors     # Get top contributors
GET    /api/lesson/most-saved           # Get most saved lessons
GET    /api/lesson/:id                  # Get a single lesson
PUT    /api/lesson/update/:lessonId     # Update a lesson
DELETE /api/lesson/delete/:lessonId     # Delete a lesson
```

### Comments
```http
POST   /api/comment/create              # Add a comment to a lesson
GET    /api/comment/:lessonId           # Get comments for a lesson
```

### Likes
```http
POST   /api/like/add                    # Like or unlike a lesson
GET    /api/like/:lessonId              # Get lesson likes
```

### Saved Lessons
```http
POST   /api/save/add                    # Save a lesson
GET    /api/save/my-favorite            # Get saved lessons
DELETE /api/save/delete/:lessonId       # Remove a saved lesson
```

### Reports
```http
POST   /api/report/add                  # Report a lesson
DELETE /api/report/delete/:lessonId     # Delete all reports for a lesson
```

### Users
```http
PUT    /api/me/update-plan/:userId      # Update user's subscription plan
PATCH  /api/me/promote/:userId          # Promote a user (admin)
GET    /api/me/all                      # Get all users
GET    /api/me/dashboard                # Get current user's dashboard data
DELETE /api/me/delete/:userId           # Delete a user
GET    /api/me/:userId                  # Get user's lesson summary
```

### Admin *(role: admin only)*
```http
GET    /api/admin/states                # Get admin dashboard statistics
```

---

## 🔐 Security

- All sensitive routes require a valid session token (verified via **jose**)
- Admin routes additionally check `role === 'admin'` before proceeding
- Stripe webhooks are validated with the webhook secret to prevent spoofing
- Request bodies are validated with **Zod** before reaching controllers
- CORS is restricted to the configured `CLIENT_URL`

---

## 👥 User Roles

| Role | Access |
|------|--------|
| **Guest** (unauthenticated) | Read public free lessons |
| **User** | Read + write lessons, comment, like, save, manage own profile |
| **Admin** | All user capabilities + manage users, manage all lessons, review reports, view analytics |

---
