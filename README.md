# SANKALP — Jesan Steel Works

Premium responsive static website for SANKALP steel furniture, a product of Jesan Steel Works in Hoshiarpur, Punjab.

## Website pages

- `index.html` — Home and featured products
- `infrastructure.html` — 10-step furniture-making process
- `about.html` — Founder and company profile
- `contact.html` — Contact details, searchable product enquiry and Google Map

## Shared files

- `styles.css` — complete responsive design for all pages
- `script.js` — navigation, animations, searchable product selector and WhatsApp enquiry functions
- `site-config.js` — shared phone number, WhatsApp number, showroom address, map link and brand settings
- `assets/images/` — logos, owner portraits, showroom photographs, products and manufacturing-process images

This is a plain HTML/CSS/JavaScript website. It does not use React, Next.js, Node.js, npm, a database or a build process.

## Editing and previewing

Open the project folder in VS Code and use Live Preview. Change shared business details only in `site-config.js`.

## Contact behaviour

- Phone-number links use `tel:+919041095780`.
- WhatsApp buttons open a direct chat with `+91 90410 95780`.
- Enquiry forms prepare a structured WhatsApp message using the customer's name, number and selected product.

## GitHub Pages

The root files are published from the `main` branch through GitHub Pages. The compatibility file at `infrastructure/index.html` keeps the `/infrastructure/` link working.
