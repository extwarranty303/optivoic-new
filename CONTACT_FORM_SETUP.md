# Contact Form Email Setup

The contact form stores submissions in Supabase and sends emails to both connect@optivoic.com and the customer.

## Quick Setup (Recommended)

**Follow the detailed guide in `EMAILJS_SETUP.md`** for complete step-by-step instructions.

## Summary of Steps

1. **Create EmailJS Account** at [emailjs.com](https://emailjs.com)
2. **Add Email Service** (Gmail recommended)
3. **Create Two Email Templates:**
   - Admin notification (to connect@optivoic.com)
   - Customer confirmation (to the person who submitted the form)
4. **Get Your Credentials:**
   - Service ID
   - Two Template IDs
   - Public Key
5. **Update Code** in `OptiVoicLanding.jsx` with your actual credentials

## Current Implementation Status

- ✅ Form UI and validation
- ✅ Supabase data storage
- ✅ EmailJS integration (needs credentials)
- ✅ Success/error handling
- ✅ Responsive design

Once you configure the EmailJS credentials, the contact form will send emails automatically!