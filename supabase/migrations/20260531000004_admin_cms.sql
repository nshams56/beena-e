-- Phase 5: Admin CMS — profiles, post writes, storage

-- Profiles policies
create policy "Users read own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "Users insert own profile"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

create policy "Users update own profile"
  on public.profiles for update
  to authenticated
  using (id = auth.uid());

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    'editor',
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper: admin or editor role
create or replace function public.is_editor_or_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role in ('admin', 'editor')
  );
$$;

-- Posts: full CMS access for editors/admins
create policy "Editors read all posts"
  on public.posts for select
  to authenticated
  using (public.is_editor_or_admin());

create policy "Editors insert posts"
  on public.posts for insert
  to authenticated
  with check (public.is_editor_or_admin());

create policy "Editors update posts"
  on public.posts for update
  to authenticated
  using (public.is_editor_or_admin());

create policy "Editors delete posts"
  on public.posts for delete
  to authenticated
  using (public.is_editor_or_admin());

-- Categories read for post form
alter table public.categories enable row level security;

create policy "Authenticated read categories"
  on public.categories for select
  to authenticated
  using (true);

-- Services: editors can update (optional CMS)
create policy "Editors update services"
  on public.services for update
  to authenticated
  using (public.is_editor_or_admin());

create policy "Editors insert services"
  on public.services for insert
  to authenticated
  with check (public.is_editor_or_admin());

-- Storage bucket for blog images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

create policy "Public read media"
  on storage.objects for select
  to public
  using (bucket_id = 'media');

create policy "Editors upload media"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'media'
    and public.is_editor_or_admin()
  );

create policy "Editors update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_editor_or_admin());

create policy "Editors delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_editor_or_admin());
