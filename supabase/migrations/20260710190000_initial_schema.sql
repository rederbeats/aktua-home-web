create extension if not exists "pgcrypto";

create type property_operation as enum ('sale', 'rent');
create type property_status as enum ('available', 'reserved', 'sold');
create type import_status as enum ('draft', 'review', 'applied', 'failed');
create type blog_post_status as enum ('draft', 'published');
create type lead_type as enum ('information', 'viewing', 'seller', 'mortgage', 'contact');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  internal_reference text not null unique,
  external_reference text,
  source text,
  slug text not null unique,
  title text not null,
  description text,
  property_type text not null,
  operation property_operation not null,
  price numeric(12,2),
  public_address text,
  province text,
  municipality text,
  neighborhood text,
  built_area numeric(8,2),
  usable_area numeric(8,2),
  bedrooms integer check (bedrooms >= 0),
  bathrooms integer check (bathrooms >= 0),
  floor text,
  has_elevator boolean not null default false,
  has_terrace boolean not null default false,
  has_garage boolean not null default false,
  has_storage_room boolean not null default false,
  has_pool boolean not null default false,
  property_condition text,
  energy_certificate text,
  latitude numeric(10,7),
  longitude numeric(10,7),
  video_url text,
  virtual_tour_url text,
  status property_status not null default 'available',
  published_at timestamptz,
  tags text[] not null default '{}',
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint properties_external_source_unique unique (source, external_reference)
);

create table public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.property_features (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  feature_key text not null,
  feature_value text,
  created_at timestamptz not null default now(),
  unique (property_id, feature_key)
);

create table public.property_imports (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  status import_status not null default 'draft',
  dry_run boolean not null default true,
  total_records integer not null default 0,
  create_count integer not null default 0,
  update_count integer not null default 0,
  withdrawn_count integer not null default 0,
  error_count integer not null default 0,
  summary jsonb not null default '{}'::jsonb,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  applied_at timestamptz
);

create table public.property_import_logs (
  id uuid primary key default gen_random_uuid(),
  import_id uuid not null references public.property_imports(id) on delete cascade,
  level text not null check (level in ('info', 'warning', 'error')),
  external_reference text,
  message text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.blog_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.blog_categories(id) on delete set null,
  slug text not null unique,
  title text not null,
  excerpt text,
  content text,
  featured_image text,
  author_id uuid references public.profiles(id) on delete set null,
  published_at timestamptz,
  status blog_post_status not null default 'draft',
  seo_title text,
  seo_description text,
  social_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_post_tags (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id uuid not null references public.blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete set null,
  type lead_type not null,
  name text not null,
  email text,
  phone text,
  message text,
  consent_privacy boolean not null,
  source_path text,
  user_agent text,
  ip_hash text,
  created_at timestamptz not null default now()
);

create table public.viewing_requests (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  preferred_date date,
  preferred_time text,
  status text not null default 'new' check (status in ('new', 'contacted', 'scheduled', 'closed')),
  created_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create index properties_public_search_idx on public.properties (status, operation, property_type, municipality, neighborhood, price);
create index properties_featured_idx on public.properties (is_featured, published_at desc);
create index property_images_property_sort_idx on public.property_images (property_id, sort_order);
create index blog_posts_public_idx on public.blog_posts (status, published_at desc);
create index blog_posts_category_idx on public.blog_posts (category_id);
create index leads_created_at_idx on public.leads (created_at desc);
create index property_import_logs_import_idx on public.property_import_logs (import_id, created_at);

alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.property_images enable row level security;
alter table public.property_features enable row level security;
alter table public.property_imports enable row level security;
alter table public.property_import_logs enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_post_tags enable row level security;
alter table public.leads enable row level security;
alter table public.viewing_requests enable row level security;
alter table public.site_settings enable row level security;

create policy "Public can read published properties"
  on public.properties for select
  using (status in ('available', 'reserved') and published_at is not null);

create policy "Public can read public property images"
  on public.property_images for select
  using (exists (
    select 1 from public.properties p
    where p.id = property_images.property_id
      and p.status in ('available', 'reserved')
      and p.published_at is not null
  ));

create policy "Public can read published posts"
  on public.blog_posts for select
  using (status = 'published' and published_at is not null);

create policy "Public can read blog categories"
  on public.blog_categories for select
  using (true);

create policy "Public can read blog tags"
  on public.blog_tags for select
  using (true);

create policy "Public can create leads"
  on public.leads for insert
  with check (consent_privacy = true);

create policy "Authenticated admins can manage profiles"
  on public.profiles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated admins can manage properties"
  on public.properties for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated admins can manage property images"
  on public.property_images for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated admins can manage property features"
  on public.property_features for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated admins can manage imports"
  on public.property_imports for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated admins can manage import logs"
  on public.property_import_logs for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated admins can manage blog"
  on public.blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated admins can manage blog taxonomy"
  on public.blog_categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated admins can manage tags"
  on public.blog_tags for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated admins can manage post tags"
  on public.blog_post_tags for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated admins can read leads"
  on public.leads for select
  using (auth.role() = 'authenticated');

create policy "Authenticated admins can manage viewing requests"
  on public.viewing_requests for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated admins can manage site settings"
  on public.site_settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
