# Palette and type

Derived from the client's live site, not invented. Source: `https://italgardennola.com/css/custom.css`
(saved at `data/raw/client-custom.css`, fetched 2026-10-18). Counts are occurrences in that file.
The site's base `style.css` and Toast pages were not readable from the build environment, and no
screenshot was taken, so this is "what their stylesheet declares", not a rendered-pixel sample.

| Token | Hex | Where it comes from |
| --- | --- | --- |
| `leaf` | `#1e7741` | Nav active/hover and link accent (20×) |
| `leaf-deep` | `#0b5226` | Primary button background and border, catering button (5×) |
| `bark` | `#653b00` | Section headline text on the map/newsletter block (13×) |
| `espresso` | `#332927` | `.header` background |
| `ink` | `#3f413e` | Body copy in about + reviews sections (7×) |
| `sun` | `#f4be20` | Map pin, about-section button fill (7×); review stars use `#ffbd07` |
| `sand` | `#e8e8d0` | Dropdown panel and disabled-button fill |
| `paper` | `#f0efdd` | About section background; used as the page background |
| `sage` | `#b1c89a` | Carousel dot (active) |
| `white` | `#fff` | Most common color in the file (21×); used for cards |
| `danger` | `#9b2c1a` | **Derived**, not on the client's site. Errors and "remove" only. |

Removed from the old dark theme: `studio-black`, `charcoal`, `gold*`, `mist`, `palm*`, `turmeric`,
`pepper`, `clay`, `cream` (`#F5EDD8` did not match anything on the client's site), and the
`text-gold-gradient` / `garden-gradient` utilities.

Check before launch: `ink` at 75% on `paper` is the muted text color and sits just above 4.5:1; do not go lighter
for body-size text.

## Fonts

From the same stylesheet, loaded with `@fontsource` (no Google Fonts request):

- **Sulphur Point** — headings, navigation, buttons, body. Their site sets headings in uppercase; this build keeps
  sentence case for readability on the menu and uses uppercase only for small labels.
- **Square Peg** — their script "subheading" face. Used for the one emphasised word in a headline (`.script`).

## Cross-check against the logo and photos

`public/images/logo.png` is drawn on a cream ground (`#eeeed7`, `#f8f8e1`) with a green avocado, orange-tan bowl
(`#ca9c59`) and yellow sun rays (`#eceaaa`), which sits right next to `paper`/`sand`/`sun`. The food photos are dominated
by browns and golds (`#6f2e0c`, `#97621a`, `#995423`), which is why `bark` and `espresso` are used for large dark areas.
