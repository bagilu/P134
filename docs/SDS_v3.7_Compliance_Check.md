# P134 SDS v3.7 Compliance Check

- Project Code: P134
- Web Version: V0.103
- SDS Version: v3.7
- Scope: static, public, no-account typing game

| Check | Result | Evidence |
|---|---|---|
| QA-01 to QA-11 | N/A | P134 V0.103 has no project database, Auth, RPC, Storage, or Supabase configuration. |
| QA-12 | PASS | ZIP contains `config-sample.js` only and no secret or `config.js`. |
| QA-13 | PASS | The included SQL files contain no mutations, global grants, or cross-project changes. |
| QA-15 | PASS | HTML, CSS, and JavaScript use V0.103 cache-busting references. |
| QA-16 | PASS | Footer order is institution identity, Web Version V0.103, then SBI-P-SDS v3.7. |
| QA-24 | PASS | Header and footer laboratory identity each use an accessible P101 hyperlink. |
| QA-25 | PASS | `index.html` loads one deferred P101 analytics script with `data-project="P134"`. |
| QA-26 | REVIEW | Validate the P101 dashboard event and the blocked-analytics fallback after deployment. |
| QA-27 | N/A | Central analytics service governance is owned by P101. |

## Manual post-deployment checks

1. Open the P134 homepage, then confirm a P134 event appears in the P101 analytics dashboard.
2. In browser developer tools, block the P101 analytics script and confirm a complete game can still be played.
3. Tab to the header and footer `好玩實驗室` links; press Enter and confirm each opens the P101 portal.
