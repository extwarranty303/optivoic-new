# OptiVoic (optivoic-new)

A Vite + React landing site with Supabase-backed contact form and EmailJS email delivery. Uses TailwindCSS for styling and includes PayPal, particles, and Supabase integrations.

**Quick start**

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

**Requirements**

- Node.js 18+ (or a compatible LTS)
- npm (or use yarn/pnpm if preferred)

**Installed packages (high level)**

- Runtime: `react`, `react-dom`, `react-router-dom`
- Email: `@emailjs/browser`
- Database: `@supabase/supabase-js`
- Payments: `@paypal/react-paypal-js`
- Particles: `react-particles`, `tsparticles-slim`
- Dev: `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`

**Environment variables**

Create a root `.env` (Vite uses `VITE_` prefixes). Example entries used by this project:

```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>

VITE_EMAILJS_SERVICE_ID=service_optivoic
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_admin_notification
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_customer_confirmation
VITE_EMAILJS_PUBLIC_KEY=<your_emailjs_public_key>
VITE_EMAILJS_ADMIN_TO=connect@optivoic.com
```

After changing `.env`, restart the dev server.

**Contact form & database**

- Contact submissions are stored to Supabase. See `contact_submissions_setup.sql` for the table schema.
- Email delivery is handled via EmailJS (see `EMAILJS_SETUP.md`).

**Where to look in the code**

- Supabase client (root): `supabaseClient.js`
- Frontend client (src): `src/supabaseClient.js`
- Contact form UI and EmailJS usage: `src/components/OptiVoicLanding.jsx`

If something in these docs looks out of date, open an issue or edit the Markdown directly.