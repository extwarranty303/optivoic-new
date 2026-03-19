# EmailJS Setup Guide for OptiVoic Contact Form

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your email account:
   - For Gmail: Click "Gmail", then "Connect Account"
   - Grant permissions when prompted
5. Name your service (e.g., "optivoic-service")
6. Click "Create Service"

## Step 3: Create Email Templates

### Template 1: Admin Notification (for connect@optivoic.com)
1. Go to "Email Templates" → "Create New Template"
2. Template ID: `template_admin_notification`
3. Subject: `New Contact Form Submission - {{from_name}}`
4. Content:
```
New contact form submission from OptiVoic landing page:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Message: {{message}}

Please follow up with this potential client about their AI website needs.
```

### Template 2: Customer Confirmation
1. Create another template
2. Template ID: `template_customer_confirmation`
3. Subject: `Thank you for contacting OptiVoic!`
4. Content:
```
Hi {{to_name}},

Thank you for reaching out to OptiVoic! We've received your message and will get back to you within 24 hours.

Your message:
{{message}}

We're excited to help you build an AI-powered website that increases service appointments for your home service business.

Best regards,
The OptiVoic Team
connect@optivoic.com
```

## Step 4: Get Your Credentials
1. Go to "Account" → "General"
2. Copy your **Public Key** (looks like: `abcdefghijk123456789`)

3. Go to "Email Services"
4. Click on your service
5. Copy the **Service ID** (looks like: `service_abc123def`)

6. Go to "Email Templates"
7. For each template, copy the **Template ID** (looks like: `template_abc123def`)

## Step 5: Update the Code
In `src/components/OptiVoicLanding.jsx`, replace these placeholder values:

```javascript
// Replace these lines in handleContactSubmit:
await emailjs.send(
  'service_optivoic', // ← Replace with your Service ID
  'template_admin_notification', // ← Replace with your admin template ID
  {
    from_name: contactForm.name,
    from_email: contactForm.email,
    phone: contactForm.phone,
    message: contactForm.help,
    to_email: 'connect@optivoic.com'
  },
  'your_public_key' // ← Replace with your Public Key
);

// And for the customer email:
await emailjs.send(
  'service_optivoic', // ← Replace with your Service ID
  'template_customer_confirmation', // ← Replace with your customer template ID
  {
    to_name: contactForm.name,
    to_email: contactForm.email,
    message: contactForm.help
  },
  'your_public_key' // ← Replace with your Public Key
);
```

## Step 6: Test
1. Deploy your changes
2. Submit the contact form
3. Check that you receive both emails
4. Verify the customer gets their confirmation

## Troubleshooting
- **Emails not sending?** Check your EmailJS dashboard for error logs
- **Wrong email address?** Make sure `connect@optivoic.com` is set up in your email service
- **Template variables not working?** Double-check the variable names match exactly

## Security Note
Never commit your EmailJS credentials to version control. Consider using environment variables in production.