# Casamento Mini Irmão & Fê

Landing page privada para Paula Velasco e Felipe Lenzi Rocha prepararem, com o Mozart, o material da cerimônia.

## Rodar localmente

```bash
npm install
cp .env.example .env.local
# cole a anon key do Supabase em .env.local
npm run dev
```

## Supabase (projeto `obdlltghazfofxugeaov`)

1. Abra o [SQL Editor](https://supabase.com/dashboard/project/obdlltghazfofxugeaov/sql/new)
2. Cole e rode o arquivo `supabase/schema.sql`
3. Em [Project Settings → API](https://supabase.com/dashboard/project/obdlltghazfofxugeaov/settings/api), copie:
   - Project URL
   - `anon` `public` key
4. Coloque no `.env.local`:

```bash
VITE_SUPABASE_URL=https://obdlltghazfofxugeaov.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

### Onde ler as respostas

- Tabela: **Table Editor → `ceremony_submissions`**
- Áudios/arquivos: **Storage → `ceremony-media`**

Autosave continua no navegador; o envio para o Supabase acontece no botão **Enviar história**.
