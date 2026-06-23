-- BEEÑA-E Consulting — initial Supabase schema
-- Run via Supabase CLI or SQL editor after project creation

create extension if not exists "pgcrypto";

create type public.user_role as enum ('admin', 'editor', 'viewer');
create type public.content_status as enum ('draft', 'published', 'archived');
create type public.subscriber_status as enum ('active', 'unsubscribed', 'bounced');
create type public.booking_status as enum ('new', 'confirmed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'editor',
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now(),
  updated_by uuid references public.profiles (id)
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  body text,
  icon text,
  sort_order int not null default 0,
  meta_title text,
  meta_description text,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  cover_image_url text,
  category_id uuid references public.categories (id),
  author_id uuid references public.profiles (id),
  status public.content_status not null default 'draft',
  published_at timestamptz,
  read_time_min int,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client_name text,
  summary text,
  body text,
  hero_image_url text,
  metrics jsonb default '{}',
  service_slugs text[] default '{}',
  status public.content_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status public.subscriber_status not null default 'active',
  source text,
  consent_at timestamptz not null default now(),
  metadata jsonb default '{}',
  created_at timestamptz not null default now()
);

create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company text,
  phone text,
  meeting_type text,
  preferred_dates text,
  timezone text,
  message text,
  status public.booking_status not null default 'new',
  created_at timestamptz not null default now()
);

create table public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_type text not null,
  payload jsonb not null default '{}',
  ip_hash text,
  spam_score numeric,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table public.community_interest (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.services enable row level security;
alter table public.case_studies enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.booking_requests enable row level security;
alter table public.form_submissions enable row level security;

create policy "Public read published posts"
  on public.posts for select
  using (status = 'published');

create policy "Public read published services"
  on public.services for select
  using (published = true);

create policy "Public read published case studies"
  on public.case_studies for select
  using (status = 'published');
