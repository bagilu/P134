# P134 英打快手 / Typing Blaster

P134 V0.1 is a no-account, browser-only typing game. Type the falling English letters before they reach the ground.

## Run

Deploy the contents of this folder to GitHub Pages, or open it through any static web server. No npm, build pipeline, database, Supabase project, or account is required.

## V0.1 functions

- A-Z targets; uppercase and lowercase input are treated equally.
- Shuffled-letter-bag randomness, preventing repetition within each set of 26 letters.
- More simultaneous targets every five points, while fall speed increases only gradually to keep the game approachable.
- Beginner / Advanced mode selector: Beginner starts with fewer and slower targets.
- Curved, target-seeking energy bolts for visible confirmation of each hit.
- Lowest matching letter is selected when duplicate targets are on screen.
- Fallen letters remain visually at the base; 10 fallen letters cause Game Over.
- Score, destroyed-letter count, fallen-letter count, and local browser high score are shown.

## SBI-P-SDS v3.7 compliance

- Static HTML/CSS/JavaScript only; no unnecessary framework or build chain.
- Visible web version and synchronized CSS/JS cache-busting version: `V0.103`.
- The homepage footer displays the institution identity, Web Version, and actual SDS version in the required order. Every laboratory-identification occurrence of `好玩實驗室` is an accessible link to the P101 portal.
- The homepage loads exactly one P101 centralized anonymous analytics script with `data-project="P134"`. It is deferred, uses the SDS v3.7 P101 endpoint, and remains independent from gameplay if blocked or unavailable.
- An accessible privacy notice states the anonymous, minimum-data purpose and excludes name, Email, raw IP address, and complete referrer URLs.
- `config-sample.js` only; no `config.js`, secret, or service-role key is included.
- `database/` is supplied for delivery consistency. It deliberately contains no SQL mutations because V0.1 has no backend and no project data.
- No SQL, database object, policy, Storage bucket, RPC, or permission touches another P project.
- This version has no account function. A future account version must use shared Supabase Auth, P134-specific authorization, an independent `storageKey`, and P130 for registration and password lifecycle.

## V0.103 change

- Upgraded the public homepage to SBI-P-SDS v3.7: P101 portal links, footer SDS identity, P101 centralized anonymous analytics installation, and a concise privacy notice.

## Files

```text
P134_TypingBlaster_V0.1/
├── index.html
├── css/app.css
├── js/app.js
├── config-sample.js
├── database/
├── docs/
└── README.md
```
