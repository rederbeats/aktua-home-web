insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'property-images',
  'property-images',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can read property images bucket"
  on storage.objects for select
  using (bucket_id = 'property-images');

create policy "Authenticated admins can upload property images"
  on storage.objects for insert
  with check (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "Authenticated admins can update property images"
  on storage.objects for update
  using (bucket_id = 'property-images' and auth.role() = 'authenticated')
  with check (bucket_id = 'property-images' and auth.role() = 'authenticated');

create policy "Authenticated admins can delete property images"
  on storage.objects for delete
  using (bucket_id = 'property-images' and auth.role() = 'authenticated');
