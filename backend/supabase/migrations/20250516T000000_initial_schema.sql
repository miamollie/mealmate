-- Enable extensions needed for UUID generation
create extension if not exists "pgcrypto";

-- USERS table (app-specific user data)
create table public.users (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid unique not null,  -- links to auth.users.id
  created_at timestamptz default now()
);

-- RECIPES table
create table public.recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  ingredients jsonb,
  instructions jsonb,
  -- add primay_ingredients as searchable data filter
  -- add number serves, difficulty, cook time, prep time
  created_at timestamptz default now()
);

-- Add GIN index on ingredients JSONB for efficient search
create index recipes_ingredients_gin_idx
  on public.recipes using gin (ingredients jsonb_path_ops);

-- MEAL PLANS table
create table public.meal_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  start_date date,
  end_date date,
  days jsonb, -- e.g. { "monday": [recipe_id, ...], ... }
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.meal_plans enable row level security;

-- RLS policies for users table
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = auth_id);

create policy "Insert own user profile"
  on public.users for insert
  with check (auth.uid() = auth_id);

create policy "Update own user profile"
  on public.users for update
  using (auth.uid() = auth_id)
  with check (auth.uid() = auth_id);

create policy "Delete own user profile"
  on public.users for delete
  using (auth.uid() = auth_id);

-- RLS policies for meal_plans table
create policy "Users can access own meal plans"
  on public.meal_plans for all
  using (auth.uid() = (
    select auth_id from public.users where id = user_id
  ));

-- Function to auto-create app user on auth sign-up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (auth_id, created_at)
  values (new.id, now())
  on conflict (auth_id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users insert to call handle_new_user()
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();


-- // TODO create a function that creates user preferences  on create too, or use upsert always

-- // todo create a view over recipes and meal_plans or any repeated joins (liked recipes etc )