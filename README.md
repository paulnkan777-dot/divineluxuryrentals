# Divine Luxury Events & Rentals — website

A single-page marketing site built with plain HTML, CSS and JavaScript. There is no build step and no backend: every enquiry opens WhatsApp with a pre-filled message.

```
index.html          page structure + static copy (hero, about, contact)
css/styles.css      all styling (colour tokens at the top)
css/fonts.css       self-hosted font declarations (loaded without blocking the page)
fonts/              Playfair Display, Cormorant Garamond and Inter (Latin, variable woff2)
js/config.js        business details: phones, email, WhatsApp, Instagram, address
js/data.js          services, rentals, tablescapes, gallery, steps, why-us
js/photos.js        generated list of responsive photo sizes (don't edit by hand)
js/main.js          all behaviour
images/             photos (optimised) + images/originals/ (source photos)
tools/              optional photo optimiser (not needed to deploy)
```

## Preview locally

Double-click `index.html`, or paste its address into Chrome, for example:

```
file:///C:/Users/Bube/Downloads/DLR%20claude/site/index.html
```

No server is needed. The scripts are plain deferred scripts, loaded in order: `config.js`, `data.js`, `photos.js`, then `main.js`. The only thing that doesn't load from a file is the web app manifest (home-screen install), which is added automatically when the site is served from a real web address.

## Change contact details

Edit **`js/config.js`**. Every phone number, email, Instagram link, address and WhatsApp link on the site is filled in from there (header, contact section, footer, floating button, CTAs and the search-engine data).

- `whatsappNumber` takes digits only, with the country code first (for example `2348104677033`).
- `phones[].display` is what visitors see. `phones[].href` is what gets dialled.

## Add or edit a rental

Open **`js/data.js`**, find `RENTALS`, copy one object and edit it:

```js
{
  category: "glassware",            // must match an id in RENTAL_CATEGORIES
  name: "Gold-Rim Tumbler",
  description: "A short one-line description.",
  image: null,                      // or "images/rental-gold-rim-tumbler.jpg"
  imageHint: "images/rental-gold-rim-tumbler.jpg",
},
```

To add a new filter category, add `{ id: "...", label: "..." }` to `RENTAL_CATEGORIES`. Services, tablescapes, gallery items, steps and why-us items work the same way. Gallery items use `caption` instead of `name`.

## Replace a placeholder with a real photo

Each placeholder card shows the filename it expects (for example `images/rental-ivory-charger.jpg`).

**Quick way:** save the photo into `images/` under that name. In `js/data.js`, set the item's `image` to the same path and add an `alt` describing the photo:

```js
image: "images/rental-ivory-charger.jpg",
alt: "An ivory charger plate with a wide rim, photographed from above",
```

**Best-quality way (WebP + responsive sizes):** put the original photo in `images/originals/`, then run:

```
npm install --prefix tools
node tools/optimise-images.cjs
```

This writes WebP and JPG versions at 600, 1000 and 1600px wide (never larger than the original), rebuilds `js/photos.js`, and regenerates `images/og-image.jpg` and the app icons. The site then serves the smallest suitable file automatically.

Use photos at least 1600px wide where you can. The current photos are 744–1280px wide, so the hero looks soft on large desktop screens. A landscape hero photo about 2400px wide would help most.

## Logo

The logo badge is `images/logo.png` (and `logo.webp`). It's cut from `images/originals/logo-source.jpg` by the optimiser script, which also builds `favicon.png` and the app icons. The source is only 208px wide. If you have a larger or vector version of the logo, save it as `logo-source.jpg`, adjust the circle position (`LOGO`) in `tools/optimise-images.cjs`, and rerun the script.

## Stock photos (stand-ins)

Your own photos are the hero, `gold-napkin-tablescape`, `tea-cup-service` and `silver-rim-place-setting`. Every other photo is a stock stand-in from [Unsplash](https://unsplash.com/license), chosen to show the actual product named on each card. The Unsplash licence allows free commercial use with no attribution required, but the photographers are credited below.

These photos show the type of item, not your exact stock. Replace each one with a photo of your own piece when you can: save it over the same filename in `images/originals/` and rerun the optimiser.

| File | Photographer | Source |
| --- | --- | --- |
| `images/service-wedding-rentals.jpg` | [Didi Paul](https://unsplash.com/@didipaul) | [photo](https://unsplash.com/photos/xSMR2tM1dmE) |
| `images/service-party-rentals.jpg` | [Onkar Singh](https://unsplash.com/@mo_onkar) | [photo](https://unsplash.com/photos/D31ZvQgI9z8) |
| `images/service-dinnerware-chargers.jpg` | [Lucas T Photography](https://unsplash.com/@lucastphotography) | [photo](https://unsplash.com/photos/3nXP8X9rziQ) |
| `images/service-glassware-cutlery.jpg` | [Freddy G](https://unsplash.com/@freddygmedia) | [photo](https://unsplash.com/photos/kMGcknkhkNw) |
| `images/service-tables-chairs.jpg` | [Matt Benson](https://unsplash.com/@mattgyver) | [photo](https://unsplash.com/photos/cQxEJoQZ_-E) |
| `images/service-centrepieces-floral.jpg` | [Ilse Orsel](https://unsplash.com/@lgtts) | [photo](https://unsplash.com/photos/764AQOH1qaw) |
| `images/service-event-setup.jpg` | [Vidit Goswami](https://unsplash.com/@viditgoswami) | [photo](https://unsplash.com/photos/Zi_NOBHIk9A) |
| `images/rental-ivory-charger.jpg` | [Erika Fletcher](https://unsplash.com/@joyshotsphotography) | [photo](https://unsplash.com/photos/quKkhmldPJQ) |
| `images/rental-white-dinner-set.jpg` | [Anna Kumpan](https://unsplash.com/@ankumpan) | [photo](https://unsplash.com/photos/mlx3fUSnN7s) |
| `images/rental-crystal-wine-goblet.jpg` | [Ksenia Pixelesse](https://unsplash.com/@pixelesse) | [photo](https://unsplash.com/photos/yj8T4YPP8Mw) |
| `images/rental-champagne-flute.jpg` | [Oliver Sherwin](https://unsplash.com/@sherwinphotography) | [photo](https://unsplash.com/photos/f54dnkSRSMc) |
| `images/rental-gold-trim-cutlery.jpg` | [David Billings](https://unsplash.com/@dav_billings) | [photo](https://unsplash.com/photos/NID5iadR7RE) |
| `images/rental-silver-cutlery.jpg` | [Andrey Ilkevich](https://unsplash.com/@ilkevich) | [photo](https://unsplash.com/photos/YXe0d6T4ToA) |
| `images/rental-round-banquet-table.jpg` | [Wedding Dreamz](https://unsplash.com/@wedding_dreamz) | [photo](https://unsplash.com/photos/pqkn1uIS6jY) |
| `images/rental-wishbone-chair.jpg` | [Caroline Badran](https://unsplash.com/@___atmos) | [photo](https://unsplash.com/photos/Xlt6nIXpeb4) |
| `images/rental-ivory-runner.jpg` | [Costa Live](https://unsplash.com/@vendedorescostalive) | [photo](https://unsplash.com/photos/W20zuFrrM6Q) |
| `images/rental-velvet-tablecloth.jpg` | [Elly van der Pas](https://unsplash.com/@jigmepalmo) | [photo](https://unsplash.com/photos/cb8DN-Hs3Lo) |
| `images/rental-floral-centrepiece.jpg` | [Cody  Chan](https://unsplash.com/@cceee) | [photo](https://unsplash.com/photos/E9lp-yVb17A) |
| `images/rental-candle-cluster.jpg` | [Claudio Schwarz](https://unsplash.com/@purzlbaum) | [photo](https://unsplash.com/photos/e7cDMN6f0gs) |
| `images/rental-gold-napkin-ring.jpg` | [Mel Poole](https://unsplash.com/@melpoole) | [photo](https://unsplash.com/photos/JW5yII3gcpE) |
| `images/rental-table-number-stand.jpg` | [Bruno Ngarukiye](https://unsplash.com/@itsbrunoagain) | [photo](https://unsplash.com/photos/MncFG5PQxN4) |
| `images/rental-silver-coffee-pot.jpg` | [Angie Dutton](https://unsplash.com/@photosbyangied) | [photo](https://unsplash.com/photos/N5XpwTmMlVw) |
| `images/tablescape-soft-sophisticated.jpg` | [Jenna Duxbury](https://unsplash.com/@jennaduxburystills) | [photo](https://unsplash.com/photos/tOvd20WxuJM) |
| `images/tablescape-garden-celebration.jpg` | [Volodymyr Lymariev](https://unsplash.com/@vlmrv) | [photo](https://unsplash.com/photos/7AG36dnF_E0) |
| `images/gallery-wedding-reception-table.jpg` | [Adi Albulescu](https://unsplash.com/@adialbulescu) | [photo](https://unsplash.com/photos/qGHAn-qOr5Q) |
| `images/gallery-bridal-table.jpg` | [Annie Gray](https://unsplash.com/@anniegray) | [photo](https://unsplash.com/photos/tgmGOhXVuoI) |
| `images/gallery-private-dinner.jpg` | [Gabriella Clare Marino](https://unsplash.com/@gabiontheroad) | [photo](https://unsplash.com/photos/lcGz6gZsSsk) |
| `images/gallery-evening-dining.jpg` | [M F](https://unsplash.com/@mfe1) | [photo](https://unsplash.com/photos/fb0_wj2MZk4) |
| `images/gallery-tablescape-detail.jpg` | [Jordan Arnold](https://unsplash.com/@jordanarnold) | [photo](https://unsplash.com/photos/Ul07QK2AR-0) |
| `images/gallery-styled-table-wide.jpg` | [David Goldman](https://unsplash.com/@davidjessephoto) | [photo](https://unsplash.com/photos/KKTCngYYWFk) |
| `images/gallery-crystal-glassware.jpg` | [Volodymyr Lymariev](https://unsplash.com/@vlmrv) | [photo](https://unsplash.com/photos/s46Yt8LGEu4) |
| `images/gallery-champagne-flute.jpg` | [Alexander Naglestad](https://unsplash.com/@alexandernaglestad) | [photo](https://unsplash.com/photos/xzKtOI1Cnxo) |
| `images/gallery-charger-stack.jpg` | [Angèle Kamp](https://unsplash.com/@angelekamp) | [photo](https://unsplash.com/photos/NK19f93xX88) |
| `images/gallery-wishbone-chairs.jpg` | [Franco Debartolo](https://unsplash.com/@francotheshooter) | [photo](https://unsplash.com/photos/08LvhOkBHQA) |
| `images/gallery-reception-seating.jpg` | [Nick Fewings](https://unsplash.com/@jannerboy62) | [photo](https://unsplash.com/photos/yzqR-1tZVKI) |
| `images/gallery-tent-setup.jpg` | [Samuel Regan-Asante](https://unsplash.com/@reganography) | [photo](https://unsplash.com/photos/bie6vVstGTk) |
| `images/gallery-styling-before-guests.jpg` | [Nani Williams](https://unsplash.com/@nanihana) | [photo](https://unsplash.com/photos/kLSrwr3aW3E) |
| `images/gallery-floral-candle-decor.jpg` | [kylefromthenorth™️](https://unsplash.com/@kylefrederick10) | [photo](https://unsplash.com/photos/divZsHxB0m4) |
| `images/gallery-napkin-accents.jpg` | [sheri silver](https://unsplash.com/@sheri_silver) | [photo](https://unsplash.com/photos/ohDy310j8pM) |

## Deploy

The site is live at **https://divineluxuryrentals.netlify.app**. Netlify is connected to the GitHub repository, so publishing a change is just:

```
git add -A
git commit -m "Describe the change"
git push
```

Netlify redeploys automatically within a minute or so. `netlify.toml` tells it there's no build step, and `_headers` sets caching.

**Custom domain:** in Netlify, go to *Domain management → Add a domain* and follow the DNS steps. Then replace `https://divineluxuryrentals.netlify.app` with the new domain in `index.html` (canonical, `og:url`, `og:image`, `twitter:image`), `robots.txt` and `sitemap.xml`, and push.

**Other hosts:** Vercel (`npx vercel`, which uses `vercel.json`), or cPanel (upload the folder's contents to `public_html/`, leaving out `tools/node_modules/`).

**After launch:** test a link preview with the Facebook Sharing Debugger, and submit `sitemap.xml` in Google Search Console.

## Notes

- Prices, testimonials and client names are deliberately not included. Add them only once they're real.
- Before launch, consider replacing the stock stand-ins in the gallery especially. It's labelled as past events, so it should show your own work.
- Motion respects the visitor's "reduce motion" setting.
- Colour contrast meets WCAG AA. Small gold text on champagne backgrounds uses the darker `--gold-ink` token.
