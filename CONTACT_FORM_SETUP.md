# Contact Form Email Setup

The contact form stores submissions in Supabase and sends emails to both connect@optivoic.com and the customer.

## EmailJS Setup (Currently Implemented)

The contact form uses EmailJS to send emails. You need to:

1. **Install EmailJS** (already done):
```bash
npm install @emailjs/browser
```

2. **Sign up at [EmailJS](https://www.emailjs.com/)** and get your credentials:
   - Service ID
   - Public Key
   - Template IDs (create 2 templates)

3. **Create Email Templates in EmailJS:**

   **Template 1: Admin Notification** (ID: `template_admin_notification`)
   ```
   Subject: New Contact Form Submission - {{from_name}}

   New contact form submission from OptiVoic landing page:

   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   Message: {{message}}

   Please follow up with this potential client about their AI website needs.
   ```

   **Template 2: Customer Confirmation** (ID: `template_customer_confirmation`)
   ```
   Subject: Thank you for contacting OptiVoic!

   Hi {{to_name}},

   Thank you for reaching out to OptiVoic! We've received your message and will get back to you within 24 hours.

   Your message:
   {{message}}

   We're excited to help you build an AI-powered website that increases service appointments for your home service business.

   Best regards,
   The OptiVoic Team
   connect@optivoic.com
   ```

4. **Update the code** in `OptiVoicLanding.jsx`:
   Replace these placeholder values with your actual EmailJS credentials:
   - `'service_optivoic'` → Your EmailJS Service ID
   - `'template_admin_notification'` → Your admin template ID
   - `'template_customer_confirmation'` → Your customer template ID
   - `'your_public_key'` → Your EmailJS Public Key

## Database Setup

Run the `contact_submissions_setup.sql` file in your Supabase dashboard to create the contact submissions table.

## Current Implementation Status

- ✅ Form UI and validation
- ✅ Supabase data storage
- ✅ EmailJS integration (needs credentials)
- ✅ Success/error handling
- ✅ Responsive design

Once you configure the EmailJS credentials, the contact form will be fully functional!