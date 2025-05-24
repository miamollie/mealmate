-- supabase/seed.sql

-- Insert a fake user (you'd normally link this with a real auth.user)
insert into users (id, auth_id)
values ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001');

-- Sample recipe
insert into recipes (id, user_id, title, ingredients, instructions)
values (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000001',
  'Pasta Primavera',
  '[ "pasta", "vegetables", "olive oil" ]',
  'Boil pasta, sauté vegetables, mix together.'
);
