Raw captures, fetched 2026-10-18.

- `public-menu-page.txt` — text of https://italgardennola.com/new-orleans-i-tal-garden-food-menu (source of truth for `lib/menu-data.ts`)
- `client-custom.css` — https://italgardennola.com/css/custom.css (source of the palette and fonts, see `PALETTE.md`)
- `*.html` — full page HTML (gitignored)
- Toast (`order.toasttab.com/online/...`) was NOT captured: Cloudflare bot challenge (HTTP 403, `cf-mitigated: challenge`) in both curl and a plain Playwright render. Modifier rules are therefore unconfirmed.
