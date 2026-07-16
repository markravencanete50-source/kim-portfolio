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

5. Set up the **admin account** (this replaces the old password gate):

   1. In the Firebase Console → **Authentication** → **Sign-in method**, enable
      **Email/Password**.
   2. Under **Authentication → Users**, **Add user** with the admin email and a
      strong password.
   3. In **Firestore**, create a collection named **`user`**. Add a document
      whose **ID is that user's UID** (copy it from the Users tab) with fields:

      ```
      email:       admin@example.com
      displayName: Karl
      role:        admin
      createdAt:   (timestamp)
      ```

   The `/admin` dashboard signs in with Email/Password and only unlocks when the
   signed-in user's `user/{uid}` document has `role: "admin"`.

### Data model

- **`user`** — `{ email, displayName, role, createdAt }` (doc ID = Auth UID)
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
   from your `.env.local` (the six `NEXT_PUBLIC_FIREBASE_*` keys) under
   **Settings → Environment Variables**.
4. Deploy. Every push to `main` redeploys automatically.

After deploying, add your live domain (e.g. `your-app.vercel.app`) to Firebase →
**Authentication → Settings → Authorized domains** — otherwise admin sign-in will
be blocked on the deployed site.

---

## 5. Admin security

The `/admin` dashboard is protected by **Firebase Authentication** and
role-based Firestore rules:

- Sign-in uses **Email/Password** (`src/lib/auth.js`).
- Access is granted only when the signed-in user's `user/{uid}` document has
  `role: "admin"` — set this up in section 2, step 5.
- `firestore.rules` allows public **create** on `leads`/`pageviews` (so the
  booking form and analytics still work for anonymous visitors) but restricts
  **read/update** to admins via an `isAdmin()` check.

To add another admin, create the Auth user and a matching `user/{uid}` document
with `role: "admin"`.

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
