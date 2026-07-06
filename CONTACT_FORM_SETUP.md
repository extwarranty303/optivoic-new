# Contact Form — Setup and Configuration

The contact form stores submissions in Supabase and sends emails to both `connect@optivoic.com` and the submitting user via EmailJS.

## Quick Setup

1. Configure Supabase table using `contact_submissions_setup.sql` (open in Supabase SQL editor or run with psql if self-hosted).
2. Create an EmailJS account and service (see `EMAILJS_SETUP.md`).
3. Add the required environment variables to a root `.env` (see example below).
4. Restart the dev server after changing `.env`.

## Required environment variables

Add these to your `.env` at project root:

```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>

VITE_EMAILJS_SERVICE_ID=service_optivoic
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_admin_notification
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_customer_confirmation
VITE_EMAILJS_PUBLIC_KEY=<your_emailjs_public_key>
VITE_EMAILJS_ADMIN_TO=connect@optivoic.com
```

## Supabase table

Use the provided `contact_submissions_setup.sql` to create the table and indexes used by the app. The SQL file is in the project root.

## Code locations

- Contact form and EmailJS calls: `src/components/OptiVoicLanding.jsx`
- **Supabase client**: `src/supabaseClient.js`. This is the single client used by the application.

## Testing

1. Start dev server: `npm run dev`
2. Open the landing page and submit the contact form
3. Confirm a record appears in Supabase and that EmailJS logs show the sent emails

## Troubleshooting

- If records aren't saved: verify `VITE_SUPABASE_*` values and CORS settings in Supabase.
- If emails don't send: check EmailJS dashboard and ensure template variable names match the payload.