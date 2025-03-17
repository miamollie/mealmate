/*
  # Add meals table and update meal plans schema

  1. New Tables
    - `meals`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `ingredients` (text[])
      - `instructions` (text[])
      - `prep_time` (integer)
      - `cook_time` (integer)
      - `servings` (integer)
      - `difficulty` (enum)
      - `cuisine` (text)
      - `category` (text[])
      - `key_ingredients` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Changes
    - Update meal_plans table to reference meals through meal_ids jsonb
    - Add indexes for search and filtering
    
  3. Security
    - Enable RLS on meals table
    - Add policies for authenticated users
*/

-- Create difficulty enum type
CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');

-- Create meals table
CREATE TABLE IF NOT EXISTS meals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  ingredients text[] NOT NULL DEFAULT '{}',
  instructions text[] NOT NULL DEFAULT '{}',
  prep_time integer NOT NULL,
  cook_time integer NOT NULL,
  servings integer NOT NULL,
  difficulty difficulty_level NOT NULL,
  cuisine text NOT NULL,
  category text[] NOT NULL DEFAULT '{}',
  key_ingredients text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Update meal_plans table to use meal references
ALTER TABLE meal_plans 
DROP COLUMN meals,
ADD COLUMN meal_ids jsonb NOT NULL DEFAULT '[]';

-- Add indexes for search and filtering
CREATE INDEX meals_cuisine_idx ON meals(cuisine);
CREATE INDEX meals_difficulty_idx ON meals(difficulty);
CREATE INDEX meals_prep_time_idx ON meals(prep_time);
CREATE INDEX meals_cook_time_idx ON meals(cook_time);
CREATE INDEX meals_category_idx ON meals USING gin(category);
CREATE INDEX meals_key_ingredients_idx ON meals USING gin(key_ingredients);

-- Enable RLS
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can read meals"
  ON meals
  FOR SELECT
  TO authenticated
  USING (true);

-- Update trigger for meals
CREATE TRIGGER update_meals_updated_at
  BEFORE UPDATE ON meals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();