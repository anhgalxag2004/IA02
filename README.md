# Picsum Photo Browser

A minimal React + Vite app that fetches photos from the Lorem Picsum public API, shows them in an infinite-scrolling grid, and provides a detail view for each photo.

Features

- Grid of photo thumbnails with author names
- Infinite scroll: more photos load automatically when you scroll
- Photo detail page with full-size image, author, and metadata
- Routing: /photos and /photos/:id

Requirements

- Node.js and npm installed

Quick start (Windows PowerShell)

```powershell
# install dependencies
npm install

# start dev server
npm run dev
```

Open the dev server URL shown by Vite (usually http://localhost:5173) and navigate to /photos.

Notes

- Uses the Picsum API endpoints: `/v2/list` for pages and `/id/{id}/info` for individual photo info.
- Styling is done via Bootstrap CDN for quick responsiveness.
