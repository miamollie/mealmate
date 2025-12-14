# Meal Mate

Meal mate is an OpenAI powered meal plannng app.

### Technologies

Full stack TypeScript app using

- QwikCity frontend framework
- TRPC backend API layer
- Supabase auth
- relational db
- vercel hosting
- pwa with Capacitor
- github ci/cd
- observability

### Architecture

Meal Mate is designed with a hexagonal architecture, separating the application into transport, business logic, and infrastructure layers.

- **Transport Layer**: TRPC is used for transport layer, handling input/output validation, and providing a clear API for the frontend to interact with.
- **Business Logic Layer**: Services are responsible for encapsulating business logic, such as permission checks, authorisation, and app logic/behaviour.
- **Infrastructure Layer**: Clients are used to abstract over 3rd party integrations, and Repository abstracts over the database.

## DB
Using supabase db. Read the docs -> https://supabase.com/docs/guides/local-development/declarative-database-schemas

Common commands

```
supabase start

# add a new schema file or make some changes
supabase db diff -f name_of_changeset
supabase migration up  # apply migrations


# push changes to prod
supabase login
supabase link
supabase db push 
```

Note: generare seed data using [snaplet](https://github.com/supabase-community/seed)

## Feature Candidates

- [] Save liked recipes
- [] Curate meal plan (change one meal etc, before accepting)
- [] Preseed recipes, fetch and store from URL
  Streaming Responses
  Show loading + partial recipe as it streams in.

Improve perceived speed and interactivity.

Normalize ingredients later for search/shopping features
