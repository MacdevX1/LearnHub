# LearnHub - E-learning Platform Frontend

## Run
```bash
npm ci
npm run dev
```

Requires Node.js `^20.19.0` or `>=22.12.0`.

## Features
- Course listing with search and category filter
- Course detail page with enroll button and lesson list
- Lesson page with react-player (play/pause, speed, volume)
- Quiz with instant feedback and score
- Lesson + course progress saved in localStorage
- Dashboard with enrolled courses

Course data lives in `public/courses.json` (fetched with axios).
Replace the sample `videoUrl` values with your own video links.

## Deploy
```bash
npm ci
npm run build
```
The production site is written to `dist/`. Verify it locally with `npm run preview`.

- **Netlify:** build command `npm run build`, publish directory `dist` (`public/_redirects` handles route refresh).
- **Vercel:** import the repo, framework preset Vite (`vercel.json` handles route refresh).
- **GitHub Pages / sub-path:** set `base: '/repo-name/'` in `vite.config.js`, then build and publish `dist/`. Configure the host to serve `index.html` for SPA routes (or add the host-specific 404 fallback); this app uses BrowserRouter.

Course data is fetched from `public/courses.json`. No server-side secrets or environment variables are required. YouTube videos must allow embedding for playback to work.
# LearnHub
