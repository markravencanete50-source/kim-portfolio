# Karl Ian Martin C. Cañeda — Portfolio & Command Center

A portfolio site for a BPO/KPO Operations Manager, with a private admin
dashboard for site analytics and booking leads.

**Stack:** Next.js 15 (App Router) · Tailwind CSS · Framer Motion · Firebase
(Firestore) · deployed on Vercel · code hosted on GitHub.

- Public site: `/` — hero, stats, about, capabilities, experience, skills, booking form
- Admin: `/admin` — page-view analytics, traffic sources, and a leads table

---

## 1. Run it locally

Requires **Node.js 18.18+** (Node 20 recommended).

```bash
npm install
cp .env.local.example .env.local   # then fill in the values (section 2)
npm run dev
```

Open http://localhost:3000 (site) and http://localhost:3000/admin (dashboard).

> The site runs **without Firebase** for previewing — the booking form falls
> back to opening an email, and the dashboard shows a "not configured" notice.
> Wire up Firebase (below) to store leads and track views for real.

---

## 2. Firebase (database)

1. Go to the [Firebase Console](https://console.firebase.google.com/) → **Add project**.
2. Inside the project, create a **Firestore Database** (Production mode is fine).
3. Add a **Web app** (`</>` icon). Firebase shows an SDK config object — copy
   those six values into `.env.local`:

   | `.env.local` key | Firebase config field |
   |---|---|
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | `apiKey` |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `authDomain` |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `projectId` |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `storageBucket` |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | `appId` |

4. In Firestore → **Rules**, paste the contents of [`firestore.rules`](./firestore.rules)
   and publish. Collections `leads` and `pageviews` are created automatically
   on first write — no manual setup needed.

5. Set an admin password in `.env.local`:

   ```
   NEXT_PUBLIC_ADMIN_PASSWORD=your-strong-password
   ```

### Data model

- **`leads`** — `{ name, email, company, preferredTime, message, status, createdAt }`
- **`pageviews`** — `{ path, session, referrer, createdAt }`

---

## 3. GitHub (repository)

```bash
git init
git add .
git commit -m "Initial commit: portfolio + command center"
git branch -M main
git remote add origin https://github.com/<your-username>/karl-caneda-portfolio.git
git push -u origin main
```

`.gitignore` already excludes `node_modules`, `.next`, and any `.env*` files, so
your Firebase keys and password are never committed.

---

## 4. Vercel (deployment)

1. Push to GitHub (section 3).
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → import the repo.
3. Vercel auto-detects Next.js. Before deploying, add the **Environment Variables**
   from your `.env.local` (all seven `NEXT_PUBLIC_*` keys) under
   **Settings → Environment Variables**.
4. Deploy. Every push to `main` redeploys automatically.

After deploying, add your live domain to Firebase → **Authentication → Settings →
Authorized domains** if you later enable Firebase Auth.

---

## 5. Making the admin secure (recommended for production)

The `/admin` gate uses a simple password check, and `firestore.rules` currently
allows public reads on `leads`/`pageviews` so the dashboard works out of the box.
That's fine for a low-stakes personal site, but for real protection:

1. Enable **Firebase Authentication** (Email/Password) and create one admin user.
2. In `firestore.rules`, change the `allow read, update` lines from `if true` to
   `if request.auth != null`.
3. Replace the password gate in `src/app/admin/page.jsx` with a Firebase
   `signInWithEmailAndPassword` login.

---

## 6. Customizing content

Everything on the public site comes from a single file:

```
src/data/profile.js
```

Edit the name, intro, stats, capabilities, experience, education, and skills there
— no component changes needed. Swap `public/karl.jpg` for a new headshot and
`public/Karl-Caneda-Resume.pdf` for an updated résumé (keep the filenames or update
the paths in `profile.js`).

---

## Project structure

```
src/
  app/
    layout.jsx         # fonts + metadata
    page.jsx           # public portfolio
    admin/page.jsx     # analytics + leads dashboard
    globals.css        # design tokens & base styles
  components/          # Hero, Stats, Experience, Contact, etc.
  data/profile.js      # all site content
  lib/
    firebase.js        # Firebase init
    analytics.js       # page views + lead read/write helpers
public/                # headshot, résumé
firestore.rules        # Firestore security rules
```
