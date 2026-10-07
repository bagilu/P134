# P134 英打快手 / Typing Blaster

P134 V0.1 is a no-account, browser-only typing game. Type the falling English letters before they reach the ground.

## Run

Deploy the contents of this folder to GitHub Pages, or open it through any static web server. No npm, build pipeline, database, Supabase project, or account is required.

## V0.1 functions

- A-Z targets; uppercase and lowercase input are treated equally.
- Shuffled-letter-bag randomness, preventing repetition within each set of 26 letters.
- More simultaneous targets every five points, while fall speed increases only gradually to keep the game approachable.
- Curved, target-seeking energy bolts for visible confirmation of each hit.
- Lowest matching letter is selected when duplicate targets are on screen.
- Fallen letters remain visually at the base; 10 fallen letters cause Game Over.
- Score, destroyed-letter count, fallen-letter count, and local browser high score are shown.

## SBI-P-SDS v3.2 compliance

- Static HTML/CSS/JavaScript only; no unnecessary framework or build chain.
- Visible web version and synchronized CSS/JS cache-busting version: `V0.101`.
- `config-sample.js` only; no `config.js`, secret, or service-role key is included.
- `database/` is supplied for delivery consistency. It deliberately contains no SQL mutations because V0.1 has no backend and no project data.
- No SQL, database object, policy, Storage bucket, RPC, or permission touches another P project.
- This version has no account function. A future account version must use shared Supabase Auth, P134-specific authorization, an independent `storageKey`, and P130 for registration and password lifecycle.

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
