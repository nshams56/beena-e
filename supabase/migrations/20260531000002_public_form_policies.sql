-- Public form submissions from marketing site
create policy "Public insert form submissions"
  on public.form_submissions
  for insert
  to anon, authenticated
  with check (true);

create policy "Public insert booking requests"
  on public.booking_requests
  for insert
  to anon, authenticated
  with check (true);
