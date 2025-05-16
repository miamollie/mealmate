# ✅ Meal Mate MVP Vertical Slice – To-Do Checklist

## 📦 Backend (Node + tRPC + Supabase)

### 🔐 Auth & DB Setup

- [ ] Integrate  Auth
- [x] Add middleware to inject `userId` into tRPC context
- [ ] Create `users` table if needed for metadata

### 🗃️ DB Models

- [ ] `meal_plans` table (userId, week, meals)
- [ ] `recipes` table (id, title, ingredients, steps, nutrition)
- [ ] `user_preferences` table (diet, dislikes, frequency rules)

### 🤖 OpenAI Integration

- [ ] Add OpenAI client and config
- [ ] Implement `generateMealPlan(userId)` logic
- [ ] Include user preferences and recent plans in context
- [ ] Store GPT response in in-memory cache (e.g. ReDoS or Map)

### 🍽️ Meal Planning Logic

- [ ] Create tRPC route: `generateWeeklyMealPlan`
- [ ] Return meal titles + days of the week
- [ ] Create endpoint to fetch full recipe by ID
- [ ] Accept meal plan → persist to DB

---

## 🧑‍💻 Frontend (Qwik + tRPC)

### 🏗️ App Shell

- [ ] Basic layout + routing
- [ ] Connect to auth (sign in / out)
- [ ] Display logged-in user

### 📅 Meal Plan View

- [ ] Display 7-day meal titles in grid or list
- [ ] View full recipe on click
- [ ] “Dismiss” button with optional reason → triggers regen
- [ ] Accept plan button → triggers save to DB
- [ ] Onboarding
- [ ] Preferences UI

---

## 🛠️ Dev Experience / Infrastructure

- [ ] Setup `.env` for OpenAI, Supabase
- [ ] Use GitHub Actions for CI
- [ ] Local cache fallback (Map) for dev without ReDoS
- [ ] Supabase local setup or hosted project
- [ ] Add simple logging for debug & tracing

---

## ☁️ Hosting Options

- [ ] Choose hosting:
  - Frontend (Qwik): Vercel / Netlify / AWS CloudFront
  - Backend (Node): AWS Lambda / Railway / Fly.io
- [ ] Deploy Supabase
Note: for trpc router You could use the Standalone Adapter for local development, and a different adapter when deployed.


---

# Post MVP
- schedule as cron with email notification
- calendar UI + edit
- offline mode + pwa work
- wrap in capacitor to deploy

# Inspiration

- https://www.mealime.com/