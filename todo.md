# ✅ Meal Mate MVP Vertical Slice – To-Do Checklist

https://platform.openai.com/docs/guides/production-best-practices

## 📦 Backend (Node + tRPC + Supabase)

### 🔐 Auth & DB Setup

- [ ] Integrate  Auth
- [x] Add middleware to inject `userId` into tRPC context
- [x] Create `users` table if needed for metadata

### 🗃️ DB Models

- [x] `meal_plans` table (userId, week, meals)
- [x] `recipes` table (id, title, ingredients, steps, nutrition)
- [x] `user_preferences` table (diet, dislikes, frequency rules)

### 🤖 OpenAI Integration

- [x] Add OpenAI client and config
- [x] Implement `generateMealPlan(userId)` logic
- [x] Include user preferences and recent plans in context

### 🍽️ Meal Planning Logic

- [ ] Create tRPC route: `generateWeeklyMealPlan`
- [ ] Return meal titles + days of the week
- [ ] Create endpoint to fetch full recipe by ID


### Cron and email/text/push notification
- [ ] Invoke recommendations for any user not currently paused
- [ ] Future proof batching of generation
- [ ] Notify user that their meals are  ready via preferred channel
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
- [ ] Onboarding
- [ ] Preferences UI, for meals and notifications

---

## 🛠️ Dev Experience / Infrastructure

- [ ] Supabase local setup or hosted project
- [ ] Add simple logging for debug & tracing

---

# Post MVP
- weekly shopping list; send the list
- schedule as cron with email notification
- calendar UI + edit
- offline mode + pwa work; wrap in capacitor to deploy
- shared accounts

# Inspiration

- https://www.mealime.com/



Sure! Here's a **checklist** for adding **validation and guardrails** to your AI-based meal planning assistant (RAG-style):

---

### ✅ AI Meal Planner: Validation & Guardrails Checklist

#### 🔒 Schema Validation (Post-Response)

* [x] Define a strict JSON schema for expected AI output (e.g., 7 meals, each with `title` and `reused`).
* [x] Use a schema validator like `Zod`, `Ajv`, or `Yup` to validate the response.
* [ ] Handle validation failures with fallback logic or retry.

#### 🧠 Prompt Guardrails (Preemptive)

* [ ] Instruct the AI to always follow a specific JSON schema.
* [ ] Enforce diversity: “Do not repeat or closely resemble previously liked meals.”
* [ ] Set constraints: e.g., max 100 characters per title, at least 3 reused meals.

#### 📐 Similarity Checks (Post-Processing)

* [ ] Use embedding models (like OpenAI or open-source) to compute similarity between reused and new meals.
* [ ] Set a cosine similarity threshold (e.g., < 0.9) to avoid overly similar suggestions.
* [ ] Reject or regenerate meals that are too similar to reused ones.


#### ⏳ Rate Limiting & Abuse Prevention

* [ ] Track and limit requests per user per week (e.g., max 3 generations/week).
* [ ] Return a helpful error or cooldown message if limit exceeded.

#### 📊 Logging & Monitoring

* [ ] Log all AI outputs (even failures) for audit/debugging.
* [ ] Monitor validation errors, retry frequency, and fallback use.
* [ ] Set alerts for repeated failures or long-term issues.



---

Streaming

https://trpc.io/docs/client/links/httpBatchStreamLink#generators



Observability

https://grafana.com/docs/grafana/latest/introduction/

https://prometheus.io/docs/introduction/overview/

https://supabase.com/docs/guides/telemetry/metrics


### Testing 

https://community.openai.com/t/how-to-test-an-api-built-on-gpt/711096/2


## similar recipes - stop db from being poluted with similar recipes

Great question! Handling near-duplicate ML-generated recipes is key to keeping your database clean and your users’ experience smooth.

Here are some strategies to **detect and handle similar recipes when inserting**:

---

## 1. **Pre-Insertion Similarity Check**

Before inserting a new ML-generated recipe:

* **Compute a similarity score** against existing recipes.
* If similarity > threshold, either:

  * Reject inserting (skip duplicate)
  * Or update/enrich existing recipe instead

### How to implement similarity checks:

* **Text similarity on title + ingredients:**

  * Use trigram similarity (`pg_trgm` extension in Postgres)
  * Or cosine similarity on embeddings (e.g., via OpenAI embeddings or another vector store)

* **Fingerprinting / hashing:**

  * Generate a hash/fingerprint of ingredients or steps (e.g., MinHash)
  * Compare new recipe’s fingerprint to existing ones

* **Normalized comparison:**

  * Normalize ingredient lists (sort, lowercase, remove quantities)
  * Compare normalized strings

---

## 2. **PostgreSQL pg\_trgm Example**

```sql
-- Enable pg_trgm extension (if not already)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Find similar recipe names
SELECT id, name, similarity(name, 'Spicy Chickpea Curry') AS sim_score
FROM recipes
WHERE similarity(name, 'Spicy Chickpea Curry') > 0.4
ORDER BY sim_score DESC;
```

You can use this query before inserting to see if a similar recipe exists.

---

## 3. **Use Embeddings + Vector Search**

If you’re using a vector database or Postgres with `pgvector`:

* Generate an embedding for the new recipe’s key fields (title + ingredients).
* Query nearest neighbors with cosine similarity.
* Set a threshold to decide if it's a duplicate.

---

## 4. **Merge or Update Instead of Insert**

If you detect a near duplicate:

* Either **update** the existing recipe with new info (e.g., add missing tags or improve instructions)
* Or **skip** inserting to avoid clutter

---

## 5. **Practical Implementation Flow**

1. ML generates candidate recipe.
2. App calls a **similarity check function** (SQL or external).
3. If no similar recipe found:

   * Insert new recipe.
4. Else:

   * Optionally merge or log for manual review.

---

## Bonus: Track Similarity Scores or Clusters

You can add a column like `duplicate_of UUID NULL` in `recipes` to link near duplicates, or maintain clusters to track recipe variants.

---

If you want, I can help draft:

* SQL similarity check function
* Postgres `pg_trgm` setup and queries
* Vector embedding integration design


### Dig into error handling and make this nice and consistent 
