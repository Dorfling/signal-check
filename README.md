# Signal Check

An original, mobile-friendly cybersecurity awareness challenge for South African ERP consultants. Eight scenarios cover phishing, Teams invitations, QR codes, supplier bank changes, unexpected MFA prompts, safe AI use with client financial data, legitimate ERP notifications and incident reporting.

**Play:** https://dorfling.github.io/signal-check/

## Run and publish

No build step or dependencies. Serve this directory using any static file server, or open `index.html` directly. GitHub Pages serves the root of the `main` branch. `.nojekyll` bypasses Jekyll. All asset references are relative so the repository subpath works.

## Behaviour

- One point per scenario; first answer counts. Explanations and the correct action appear immediately. Optional clues never deduct points.
- Ratings: 0–3 Signal Scout; 4–5 Sharp Spotter; 6–7 Signal Sentinel; 8 Human Firewall.
- Final review includes every answer and explanation. Restart resets all results and the name.
- Optional name/nickname is entered only at the end. Canvas generates a 1200×760 PNG locally. The filename never contains the name. A blank name uses “Cyber-aware consultant”. The completion date uses Africa/Johannesburg.
- No application backend, forms submission, analytics, trackers, remote fonts, cookies or browser storage. Names, answers and scores exist only in memory. Refresh resets them. GitHub receives normal hosting request metadata. Sharing a PNG discloses whatever name its creator chose to include.
- Badges are informal self-reported awareness results, not verified qualifications. No automatic participation tracking; people send the PNG to the organiser themselves.

## Edit

`scenarios.js` contains the original scenario text, clues, options and explanations. Each `correct` value is a zero-based option index. `style.css` controls layout; `app.js` implements navigation, scoring and badge drawing. If the repository name changes, update the badge URL in `app.js` and the URL here. All addresses use reserved `.example` domains; mock attachments/buttons do not navigate and the QR illustration cannot be scanned.

## Accessibility and privacy

Keyboard-operable controls, visible focus, focus movement on navigation/feedback, progress labels, accessible badge text, responsive layout and reduced-motion support. No timed questions. Test current browsers; a modern browser with JavaScript and Canvas is required. Mobile PNG handling depends on the browser’s download/share UI.

## Content foundations

Content and visuals are original and unaffiliated with Google/Jigsaw, Microsoft or ERP vendors. The interactive inspection approach is inspired by phishing education. Guidance references:

- [NCSC: QR codes](https://www.ncsc.gov.uk/blog-post/qr-codes-whats-real-risk)
- [NCSC: MFA](https://www.ncsc.gov.uk/collection/mfa-for-your-corporate-online-services/recommended-types-of-mfa)
- [FBI: business email compromise](https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/business-email-compromise)
- [NCSC: LLMs and sensitive information](https://www.ncsc.gov.uk/blog-post/chatgpt-and-large-language-models-whats-the-risk)

Use your organisation’s local reporting channels, approval process and client-data policy. The quiz does not give legal advice or reproduce any client document.

## Teams sharing text

Team, time for a quick radar check ☕🛡️

Try **Signal Check**: eight everyday cyber decisions made for ERP consultants. Can you spot the dodgy payment request, the unexpected MFA prompt and the AI data trap?

👉 https://dorfling.github.io/signal-check/

It takes about 5–7 minutes and works on your phone. At the end, add your name or nickname, download your PNG badge and send it to me here in Teams. Your name and score stay in your browser until you choose to share the badge. No sign-up, and no shame in a second attempt — the explanations are the useful bit!
