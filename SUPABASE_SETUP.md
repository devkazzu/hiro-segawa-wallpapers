# HIRO SEGAWA — Private Admin + Public Cloud Wallpapers

> Supabase project URL and publishable key are already filled in `supabase-config.js`. The key is a frontend publishable key; keep Row Level Security enabled and never use a service-role/secret key in the website.

This version fixes the two problems:
- Visitors can open the public gallery, wallpaper details and downloads.
- Only the Supabase administrator account can sign in to `/admin.html`, upload wallpapers or delete them.
- Uploaded images and wallpaper metadata are stored in Supabase, not in one phone's `localStorage`.

## 1) Create a Supabase project

1. Create a free project at https://supabase.com/ and wait for it to finish provisioning.
2. In **Project Settings → API**, copy the **Project URL** and the **anon / publishable public key**.
3. Open `supabase-config.js` and replace the two placeholder strings:
   - `YOUR_SUPABASE_PROJECT_URL`
   - `YOUR_SUPABASE_ANON_PUBLIC_KEY`
4. Do not put a `service_role`, secret, or database password in this website. The anon/public key is intended for browser use; Row Level Security below protects the data.

## 2) Create the database and storage policies

1. In Supabase, open **SQL Editor → New query**.
2. Replace `YOUR_ADMIN_EMAIL` below with the exact email address you will use to sign in (lowercase).
3. Run this complete SQL:

```sql
create table if not exists public.wallpapers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Aesthetic',
  tags text not null default '',
  image_url text not null,
  storage_path text not null,
  published boolean not null default true,
  uploaded_by uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.wallpapers enable row level security;

drop policy if exists "Public can read published wallpapers" on public.wallpapers;
create policy "Public can read published wallpapers"
on public.wallpapers for select to anon, authenticated
using (published = true);

drop policy if exists "Only site admin can insert wallpapers" on public.wallpapers;
create policy "Only site admin can insert wallpapers"
on public.wallpapers for insert to authenticated
with check ((auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL');

drop policy if exists "Only site admin can delete wallpapers" on public.wallpapers;
create policy "Only site admin can delete wallpapers"
on public.wallpapers for delete to authenticated
using ((auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('wallpapers', 'wallpapers', true, 12582912, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 12582912,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "Public can view wallpaper files" on storage.objects;
create policy "Public can view wallpaper files"
on storage.objects for select to anon, authenticated
using (bucket_id = 'wallpapers');

drop policy if exists "Only site admin can upload wallpaper files" on storage.objects;
create policy "Only site admin can upload wallpaper files"
on storage.objects for insert to authenticated
with check (bucket_id = 'wallpapers' and (auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL');

drop policy if exists "Only site admin can delete wallpaper files" on storage.objects;
create policy "Only site admin can delete wallpaper files"
on storage.objects for delete to authenticated
using (bucket_id = 'wallpapers' and (auth.jwt() ->> 'email') = 'YOUR_ADMIN_EMAIL');
```

## 3) Create your one admin login

1. In Supabase, open **Authentication → Users → Add user**.
2. Create a user with the exact email used in the SQL policy and choose a strong password.
3. Do not enable public sign-ups. Do not share this password.
4. If you already enabled sign-ups, turn them off in **Authentication → Providers → Email**.

## 4) Upload the updated site to GitHub

1. Extract this ZIP.
2. Upload/replace the included website files in the same GitHub repository folder as your existing `index.html`.
3. Keep the existing `wallpapers/` folder if you already have one. Do not delete your existing image files.
4. Commit changes and wait for GitHub Pages to deploy.

## 5) Use it

- Public website: `https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY/`
- Private sign-in page: append `admin.html` to the website address.
- Sign in with your Supabase admin email/password. Upload from your phone; the new wallpaper becomes public in the gallery for all visitors.

The `/admin.html` address itself is not a secret. Visitors may see the sign-in screen, but without your account they cannot open the dashboard or upload/delete anything. Supabase authentication and Row Level Security enforce the permissions server-side.

## Notes

- This cloud version replaces browser-only draft publishing. Existing local drafts on the old admin page will not automatically migrate; export/preserve any important images before replacing the old files, then upload them again through the new dashboard.
- The public gallery displays the starter curated collection plus published Supabase wallpapers and any legacy `wallpapers/wallpapers.json` entries.
- The Supabase free tier has storage and bandwidth limits. Large images are resized to WebP before upload.
