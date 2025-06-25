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
  - Backend (Node): AWS Lambda / Railway / Fly.io, Vercel/ Netlify edge functions
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



Sure! Here's a **checklist** for adding **validation and guardrails** to your AI-based meal planning assistant (RAG-style):

---

### ✅ AI Meal Planner: Validation & Guardrails Checklist

#### 🔒 Schema Validation (Post-Response)

* [ ] Define a strict JSON schema for expected AI output (e.g., 7 meals, each with `title` and `reused`).
* [ ] Use a schema validator like `Zod`, `Ajv`, or `Yup` to validate the response.
* [ ] Handle validation failures with fallback logic or retry.

#### 🧠 Prompt Guardrails (Preemptive)

* [ ] Instruct the AI to always follow a specific JSON schema.
* [ ] Enforce diversity: “Do not repeat or closely resemble previously liked meals.”
* [ ] Set constraints: e.g., max 100 characters per title, at least 3 reused meals.

#### 📐 Similarity Checks (Post-Processing)

* [ ] Use embedding models (like OpenAI or open-source) to compute similarity between reused and new meals.
* [ ] Set a cosine similarity threshold (e.g., < 0.9) to avoid overly similar suggestions.
* [ ] Reject or regenerate meals that are too similar to reused ones.

#### 🔁 Retry & Fallbacks

* [ ] On validation or similarity failure, retry generation with:

  * Adjusted prompts (e.g., stronger emphasis on diversity)
  * Fewer reused meals
  * Static fallback templates (e.g., cached or hand-picked meals)

#### ⏳ Rate Limiting & Abuse Prevention

* [ ] Track and limit requests per user per week (e.g., max 3 generations/week).
* [ ] Return a helpful error or cooldown message if limit exceeded.

#### 📊 Logging & Monitoring

* [ ] Log all AI outputs (even failures) for audit/debugging.
* [ ] Monitor validation errors, retry frequency, and fallback use.
* [ ] Set alerts for repeated failures or long-term issues.

#### 📣 Feedback Loop

* [ ] Allow users to:

  * 👍 Like
  * 👎 Reject
  * 📝 Flag errors in meal suggestions
* [ ] Store this feedback for future filtering, weighting, or training.

---

Streaming

https://trpc.io/docs/client/links/httpBatchStreamLink#generators



Observability

https://grafana.com/docs/grafana/latest/introduction/

https://prometheus.io/docs/introduction/overview/

https://supabase.com/docs/guides/telemetry/metrics


### Testing 

https://community.openai.com/t/how-to-test-an-api-built-on-gpt/711096/2