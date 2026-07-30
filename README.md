# MEC OSH Department - Sama Yas

GitHub Pages-ready public website and admin prototype for:

- Masri Engineering & Contracting, MEC S.A.L.
- Sama Yas Residential Development
- Yas Island, Abu Dhabi, UAE

## Included

- English and Arabic switch with RTL layout
- MEC yellow, black and white theme
- Supplied Sama Yas hero image
- Live Man-Hours counter using UAE time
- Monday-Saturday schedule, 08:00-13:00 and 14:00-17:00
- Baseline 2,568,386 at 17:00 on 23 July 2026
- 1,500 manpower
- LTI-Free Days from 12 May 2026
- Cumulative OSH performance figures
- Category-wise Unsafe Act and Unsafe Condition table and horizontal chart
- Public anonymous safety concern form and reference tracking demo
- Document library with View and Download controls
- News, OSH gallery and Award Image Gallery placeholders
- Emergency numbers and contact forms
- `/admin` dashboard prototype
- CSV export compatible with Excel
- Supabase SQL starter schema

## Important production setup

The downloaded site works immediately as a front-end demonstration. Data entered in demo mode is stored only in the browser using localStorage.

To make login, documents, reports, statistics, gallery, news, email alerts and multi-device data live:

1. Create a Supabase project.
2. Run `supabase/schema.sql`.
3. Create public/private Storage buckets.
4. Enable email OTP for `muhammed.shamil@mecemirates.com`.
5. Add Row-Level Security policies so only this email has admin write access.
6. Replace localStorage calls with Supabase queries.
7. Add Microsoft Graph authentication for Outlook replies and Sent Items.
8. Add an email function for report alerts and acknowledgement messages.
9. Configure the official UAE holiday source or maintain holidays in Supabase.
10. Upload the files to the public GitHub repository:
   `MEC-OSH-Department/sama-yas`

Expected GitHub Pages URL:
`https://mec-osh-department.github.io/sama-yas/`

## Security note

Do not place Supabase service-role keys, Microsoft client secrets or Outlook passwords in GitHub Pages files. Use Supabase Edge Functions or another secure backend for privileged operations.


## Live Supabase connection

This package is configured for `https://absfyhdyirrdwkgjwqqn.supabase.co` using the browser-safe publishable key.
The Admin Dashboard now supports email OTP, live performance settings, safety-report management, document/news/gallery uploads, locations, holidays and enquiries.

Before publishing, run `MEC_OSH_Supabase_Security_Setup.sql`, create the admin user `muhammed.shamil@mecemirates.com`, change the Magic Link email template to use `{{ .Token }}`, and configure the GitHub Pages admin URL in Auth URL Configuration.

Microsoft 365 direct sending is not embedded. The Reply button opens the user's email application. A secure Microsoft Graph / Edge Function connection is required for automatic sending and Sent Items synchronisation.
