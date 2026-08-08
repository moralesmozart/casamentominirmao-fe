# Casamento Mini Irmão & Fê

Private wedding ceremony preparation site.

## Local development

```bash
npm install
cp .env.example .env.local
# fill in local env values (never commit them)
npm run dev
```

```bash
npm run build
```

Backend credentials and operational setup are intentionally not documented in this repository.

## GitHub Pages

Live site (after Actions deploy):

https://moralesmozart.github.io/casamentominirmao-fe/

Required repository secrets for the deploy workflow:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Settings → Pages → Source: **GitHub Actions**

