-- Optional: set your admin user's role after first login
-- Replace the email with your Supabase Auth user email, then run once.

-- update public.profiles
-- set role = 'admin'
-- where id = (
--   select id from auth.users where email = 'your-admin@email.com' limit 1
-- );
