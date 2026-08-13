# RS Sehat Sejahtera: hospital website & patient registration (portfolio piece)

A hospital website case study built for two sides of the same problem: patients who find registering online confusing (and often just show up in person with no idea how crowded it already is), and hospital staff who need an easy way to see and act on what comes in.

**There is no backend.** No login, no real database. Hospital info, doctors, services, and today's crowd levels per poli are hardcoded in [`src/lib/mock-data.ts`](src/lib/mock-data.ts). What *is* real: submitting the registration form actually saves your entry to the browser's own `localStorage` (see [`src/lib/registration-store.ts`](src/lib/registration-store.ts)). So registering, checking status on `/status`, and a "staff" member confirming it on `/petugas` in the same browser all genuinely work. It just never leaves your browser, and it isn't a real medical record.

**Doctor names and testimonials are deliberately de-identified.** Doctors are shown as initials only ("dr. A. P."), testimonials use first name plus initial. Sample content for a UI portfolio piece, not meant to read as a real person.

## Running it

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, TypeScript. No database, no auth, no state library. Plain `useState` for the wizard/filter state, `localStorage` for the one piece of real persistence shared between the patient and staff sides.

## If this ever needed to be a real hospital system

Everything here is UI over hardcoded content, plus one browser-only "database." A real deployment would need, at minimum: a real database with row-level access control, server-side validation of NIK/phone/etc., authenticated staff accounts (so `/petugas` isn't just an open URL), real-time crowd/queue counts instead of a fixed daily snapshot, a genuine booking-conflict-safe slot system, and WA/email confirmation. None of that exists here, on purpose. It's out of scope for a UI portfolio piece.
