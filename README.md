# HIRO SEGAWA — Wallpaper Universe

A mobile-friendly wallpaper gallery with individual wallpaper detail pages, favorites, search, categories and download controls.

## Cloud publishing
This build uses Supabase Auth, Database and Storage so that:
- visitors can view and download published wallpapers;
- only the configured admin account can access upload/delete controls;
- uploads become visible to every visitor on every device.

**Setup is required before cloud uploads work.** Follow `SUPABASE_SETUP.md` and configure `supabase-config.js`. Never add a Supabase service-role key to frontend files.

For the previous static/manual wallpaper publishing approach, see `wallpapers/wallpapers.json`.
