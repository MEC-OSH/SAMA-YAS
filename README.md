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


## Risk Assessment Generator
- Open `/risk-assessment/`
- Contains 119 activities extracted from the approved project risk register
- Automatically loads hazards, initial P/S/R, risk level, controls and revised P/S/R
- Allows multiple activities, editing, deletion and browser draft saving
- Generates a standalone `.docx` Word risk assessment without an external library


## Live Trend Analysis

Run `TREND_ANALYSIS_SETUP.sql` once in Supabase. The public website combines
the supplied current baseline with new safety reports while keeping individual
report records private.


## Legal references in generated risk assessments

The Risk Assessment Generator now appends applicable ADOSH-SF Code of Practice references and `ALDAR OSH-MS Rev.08 (May 2025), Appendix 5` to every activity's control-measure column. Existing references in the approved risk-register source are preserved and normalized; keyword-based references are supplied when the source activity has no explicit CoP number.

## Excel Safety Report Export

The Admin Dashboard exports a real `.xlsx` workbook. Photos from the private
Supabase `report-photos` bucket are fetched using short-lived signed URLs,
converted to compact PNG thumbnails, and embedded inside the Photo column.


## OSH Team Members

Run `TEAM_MEMBERS_SETUP.sql` once. Team profiles are managed in the Admin
Dashboard and displayed four at a time in a right-to-left carousel.


## Editable Contact Section

Run `CONTACT_SECTION_SETUP.sql` once. The Admin Dashboard can then update the
public Contact photo and all English/Arabic contact details.


## OSH Team Stakeholder Groups

Run `TEAM_STAKEHOLDER_GROUPS_UPDATE.sql` once for an existing Supabase project.
The Admin Dashboard can then assign each team member to Client, PMC, Consultant
or Main Contractor.


## Protected Document Library

The Public Document Library is no longer part of the normal page flow. It is
opened only from the drawer menu and requires the password `072024`.

The Risk Assessment Generator remains visible on the public website as a
standalone section.

Important: This is a client-side password gate on a static website. It prevents
normal browsing access but is not a substitute for server-side authentication.


## Document Library Password Management

Run `DOCUMENT_LIBRARY_PASSWORD_SETUP.sql` once. The initial password is
`072024`. The Admin Dashboard can change the password or reset it to `072024`.
The public password window includes MEC OSH Admin contact information.


## Contact Settings Schema Fix
Run `CONTACT_SETTINGS_SCHEMA_FIX.sql` when Supabase reports that
`public.contact_settings` is missing from the schema cache.
