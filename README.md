# CLabCCSB — Portail de candidatures (CosmoLAB Hub)

Application web (SPA) pour collecter des candidatures/membres/consultants CCSB et permettre à un administrateur de consulter les candidatures.

## Fonctionnalités

- Formulaire multi‑étapes (React) avec progression.
- Envoi des candidatures dans **Firestore**.
- (Optionnel) stockage de documents via **Firebase Storage**.
- Accès administrateur via **Google Auth** + panneau de gestion.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Firebase (Auth, Firestore, Storage)

## Prérequis

- Node.js (recommandé : LTS)
- npm

## Démarrage rapide

```bash
npm install
npm run dev
```

L’application démarre sur `http://localhost:3000`.

## Configuration Firebase

Le projet lit sa configuration Firebase via des variables d’environnement Vite (utilisées par `src/firebase.ts`).

1. Crée un projet Firebase
2. Active :
   - Authentication → provider **Google**
   - Firestore Database
   - Storage (si tu utilises l’upload)
3. Crée un fichier `.env` (non commité) à partir de `.env.example` et renseigne :
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - (optionnel) `VITE_FIREBASE_MEASUREMENT_ID`
   - (optionnel) `VITE_FIREBASE_FIRESTORE_DATABASE_ID`

Règles Firestore : `firestore.rules`.

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
- Environment Variables : copie les variables `VITE_FIREBASE_*` (et autres) depuis ton `.env` dans l’UI Vercel.

## Notes

- `.env.example` provient d’un template et peut être ignoré si tu n’utilises pas d’API externe (aucun usage de `GEMINI_API_KEY` dans le code actuel).
- Logo : `src/assets/CosmoLABHubLogo.png`.
