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

-- // Add a recipe Likes table to track which recipes a user has liked
CREATE TABLE recipe_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  recipe_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_recipe
    FOREIGN KEY (recipe_id)
    REFERENCES recipes(id)
    ON DELETE CASCADE,

  CONSTRAINT unique_user_recipe
    UNIQUE (user_id, recipe_id)
);
ALTER TABLE recipe_likes ENABLE ROW LEVEL SECURITY;
-- Allow users to read their own likes
CREATE POLICY "Can view own likes"
ON recipe_likes
FOR SELECT
USING (auth.uid() = user_id);

-- Allow users to like recipes (insert)
CREATE POLICY "Can like recipe"
ON recipe_likes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to unlike (delete) their own likes
CREATE POLICY "Can unlike own recipe"
ON recipe_likes
FOR DELETE
USING (auth.uid() = user_id);

-- supabase doesnt support transactions because its client is doing a http request per db interaction
-- so you can instead define a db function and invoke it using .rpc()
CREATE OR REPLACE FUNCTION like_recipe_and_promote(recipe_id UUID, user_id UUID)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- Insert like
  INSERT INTO recipe_likes (recipe_id, user_id) -- todo timestamp?
  ON CONFLICT (user_id, recipe_id) DO NOTHING;

  -- Promote recipe if not already promoted
  IF NOT EXISTS (
    SELECT 1 FROM recipes WHERE id = recipe_id
  ) THEN
    INSERT INTO recipes (
      id, name, description, ... -- list all columns
    )
    SELECT
      id, name, description, ... -- same columns from draft_recipes
    FROM draft_recipes
    WHERE id = recipe_id;
  END IF;
END;
$$;


