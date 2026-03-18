# CLabCCSB — Portail de candidatures (CosmoLAB Hub)

Application web (SPA) pour collecter des candidatures/membres/consultants CCSB et permettre à un administrateur de consulter les candidatures.

## Fonctionnalités

- Formulaire multi‑étapes (React) avec progression.
- Envoi des candidatures dans **Supabase (Postgres)**.
- (Optionnel) stockage de documents via **Supabase Storage**.
- Accès administrateur via **Supabase Auth (Google)** + panneau de gestion.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Supabase (Auth, Postgres, Storage)

## Prérequis

- Node.js (recommandé : LTS)
- npm

## Démarrage rapide

```bash
npm install
npm run dev
```

L’application démarre sur `http://localhost:3000`.

## Configuration Supabase

Le projet lit sa configuration Supabase via des variables d’environnement Vite (utilisées par `src/supabase.ts`).

1. Crée un projet Supabase
2. Initialise la DB + Storage en exécutant `supabase/schema.sql` dans Supabase Dashboard → SQL Editor.
3. Auth (admin) :
   - Authentication → Providers → active **Google**
   - Authentication → URL Configuration → ajoute tes URLs de redirection (local + Vercel)
4. Crée un fichier `.env` (non commité) à partir de `.env.example` et renseigne :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

Note sécurité:
- Ne mets jamais le mot de passe DB / connection string dans le frontend.
- `supabase/schema.sql` crée des policies permissives pour l’upload anonyme des CV (comme Firebase côté client). Pour durcir, limite l’upload aux utilisateurs authentifiés + signed URLs.

## Mode admin

- L’email admin est défini dans `src/App.tsx` (`ADMIN_EMAIL`).
- Pour afficher le bouton “Connexion Admin”, ouvre l’app avec `?admin=1` (ex : `http://localhost:3000/?admin=1`).
- Une fois connecté avec Google (popup), le bouton “Panel Admin” permet d’afficher/masquer la liste des candidatures.

## Scripts

- `npm run dev` : serveur de dev Vite (port 3000)
- `npm run build` : build de production dans `dist`
- `npm run preview` : prévisualisation du build
- `npm run lint` : vérification TypeScript (noEmit)
- `npm run clean` : supprime `dist`

## Déploiement (Vercel)

Le dépôt contient `vercel.json` (rewrite vers `index.html` pour le routing SPA).

Configuration recommandée sur Vercel :

- Build command : `npm run build`
- Output directory : `dist`
- Environment Variables : copie `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (et autres) depuis ton `.env` dans l’UI Vercel (sans guillemets), puis **redeploy**.

## Notes

- `.env.example` provient d’un template et peut être ignoré si tu n’utilises pas d’API externe (aucun usage de `GEMINI_API_KEY` dans le code actuel).
- Logo : `src/assets/CosmoLABHubLogo.png`.
