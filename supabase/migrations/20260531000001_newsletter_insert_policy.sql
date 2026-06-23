-- Allow anonymous newsletter signups from the public website
create policy "Public insert newsletter subscribers"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (true);
