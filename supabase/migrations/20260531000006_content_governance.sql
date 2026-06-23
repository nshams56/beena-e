-- Content governance: internal linking and editorial metadata for posts

alter table public.posts
  add column if not exists related_service_slug text;

alter table public.posts
  add constraint posts_related_service_slug_check
  check (
    related_service_slug is null
    or related_service_slug in (
      'strategy-advisory',
      'product-development',
      'regulatory-clinical',
      'market-access',
      'commercialization'
    )
  );

comment on column public.posts.related_service_slug is
  'Primary service for internal linking on /insights/[slug]';
