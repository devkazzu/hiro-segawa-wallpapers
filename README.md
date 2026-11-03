# HIRO SEGAWA — Wallpaper Universe

A responsive static wallpaper gallery for GitHub Pages.

## Files
- `index.html` — public wallpaper gallery
- `style.css`, `script.js` — public site styles and gallery logic
- `admin.html`, `admin.css`, `admin.js` — browser-based wallpaper admin studio
- `wallpapers/` — published wallpaper assets and `wallpapers.json` manifest

## Add wallpapers
1. Open `admin.html` on your deployed site.
2. Select one or more images, set a title/category/tags, and save drafts.
3. Click **Export for GitHub**. This downloads a ZIP containing new image files and an updated `wallpapers.json` manifest.
4. Extract the ZIP and upload the `wallpapers` folder contents into the repository's existing `wallpapers/` folder. Commit the changes.

The public gallery automatically loads `wallpapers/wallpapers.json`.

## Important hosting note
GitHub Pages is static hosting. The admin studio stores drafts in the current browser only; it does not upload files directly to GitHub or provide secure authentication. Exporting and committing the generated wallpaper folder is what publishes images for all visitors. The Admin link is public, so do not treat it as a private or secure dashboard.

## Publish
Upload all project files to the repository root. In GitHub, open **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/(root)`.
