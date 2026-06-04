# EmailJS Setup Guide for OptiVoic Contact Form

This project uses the `@emailjs/browser` package (already listed in `package.json`) to send emails from the frontend via EmailJS.

## Step 1 — Create EmailJS account
1. Go to https://www.emailjs.com/ and sign up
2. Verify your email address

## Step 2 — Add Email Service
1. In EmailJS dashboard → "Email Services" → "Add New Service"
2. Choose your provider (Gmail recommended) and connect the account
3. Name the service (e.g., `optivoic-service`)

## Step 3 — Create Email Templates
Create two templates:

- Admin notification: use a Template ID such as `template_admin_notification` and include variables like `from_name`, `from_email`, `phone`, and `message`.
- Customer confirmation: use a Template ID such as `template_customer_confirmation` with `to_name` and `message` variables.

Example template text and variable names must match what the app sends (see `src/components/OptiVoicLanding.jsx`).

## Step 4 — Get credentials
Copy your Public Key (`Settings → General`), Service ID (`Email Services → [your service]`), and each Template ID (`Email Templates`).

## Step 5 — Environment variables
Add these to a root `.env` (Vite requires `VITE_` prefixes):

```env
VITE_EMAILJS_SERVICE_ID=service_optivoic
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_admin_notification
VITE_EMAILJS_CUSTOMER_TEMPLATE_ID=template_customer_confirmation
VITE_EMAILJS_PUBLIC_KEY=<your_public_key>
VITE_EMAILJS_ADMIN_TO=connect@optivoic.com
```

Restart the Vite dev server after modifying `.env`.

## Step 6 — Test
1. Start dev server: `npm run dev`
2. Submit the contact form
3. Verify the Admin and Customer emails in the EmailJS dashboard and that records are created in Supabase

## Troubleshooting
- If emails fail, check EmailJS logs and the browser console for errors.
- Ensure template variable names match the payload the frontend sends.

## Security
Do not commit `.env` or any secret keys to version control. Use environment variables or a secrets manager in production.