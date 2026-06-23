-- Allow authenticated admin users to read submission data
create policy "Authenticated read newsletter subscribers"
  on public.newsletter_subscribers
  for select
  to authenticated
  using (true);

create policy "Authenticated read booking requests"
  on public.booking_requests
  for select
  to authenticated
  using (true);

create policy "Authenticated read form submissions"
  on public.form_submissions
  for select
  to authenticated
  using (true);

create policy "Authenticated read all posts"
  on public.posts
  for select
  to authenticated
  using (true);

create policy "Authenticated read all services"
  on public.services
  for select
  to authenticated
  using (true);

create policy "Authenticated read case studies"
  on public.case_studies
  for select
  to authenticated
  using (true);
