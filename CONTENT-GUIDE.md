# Content Guide — Bitcoin Charlotte Website

> This guide is for anyone editing content on the site — human or AI agent.
> Read this before making changes.

## How Content Works

All content lives in the `content/` directory as **YAML files**. Each business, event, resource, article, or page is one file. Edit the YAML, push to `dev`, and the site rebuilds automatically.

```
content/
├── businesses/    ← one file per business
├── events/        ← one file per event  
├── resources/     ← one file per resource
├── articles/      ← one file per article
└── pages/         ← one file per page (About, etc.)
```

## Your Workflow

1. **Pull latest:** `git pull origin dev`
2. **Edit YAML files** in `content/`
3. **Preview locally:** `npm run dev` (opens at http://localhost:4321)
4. **Commit & push:** `git add . && git commit -m "content: description" && git push origin dev`
5. **Check dev site:** https://dev.bitcoincharlotte.org (auto-rebuilds in ~30 seconds)
6. **Promote when ready:** Open a PR from `dev` → `staging` → `main`

## Content Types

---

### Businesses

**File location:** `content/businesses/<slug>.yaml`

```yaml
name: Business Name
slug: business-slug              # URL-safe, lowercase, hyphens
status: active                   # active | inactive
category: physical               # physical | popup | service | online
badges:
  - holds-bitcoin                # only if they hodl BTC
  - lightning                    # accepts Lightning
description: |
  Short description of the business.
  Can be multiple lines.
website: https://example.com
btcpay_url: https://btcpay.bitcoincharlotte.org/apps/...  # optional
location:
  address: 123 Main St, Charlotte, NC 28202
  neighborhood: South End        # NoDa, South End, Uptown, etc.
  lat: 35.2117                   # optional — for future map feature
  lng: -80.8573                  # optional
logo: /images/businesses/slug.png  # optional
payment_methods:
  - lightning
  - onchain
onboarded_date: "2026-01-15"     # optional
created: "2026-04-20"
updated: "2026-04-20"
```

**To add a new business:** Copy an existing file, change the fields, save as `new-slug.yaml`.

---

### Events

**File location:** `content/events/<slug>.yaml`

**Recurring event:**
```yaml
title: Saturday Sats Social
slug: saturday-sats-1st-sat
status: active                   # active | cancelled | past
type: recurring
schedule:
  frequency: monthly             # weekly | biweekly | monthly
  rule: 1st Saturday             # human-readable
  time: "14:00"
  end_time: "16:00"
  timezone: America/New_York
location:
  name: Tip Top Daily Market
  address: 2902 The Plaza, Charlotte, NC
  neighborhood: NoDa
description: |
  Casual Bitcoin meetup. All welcome.
tags:
  - beginner-friendly
  - networking
created: "2026-04-20"
updated: "2026-04-20"
```

**One-off event:**
```yaml
title: Workshop - Topic Name
slug: workshop-topic-name
status: active
type: one-off
date: "2026-05-15"
time: "18:30"
end_time: "20:30"
timezone: America/New_York
location:
  name: Venue Name
  address: Full address
  neighborhood: Area
description: |
  Event description.
links:
  meetup: https://meetup.com/bitcoincharlotte/events/...
  rsvp: null
tags:
  - workshop
created: "2026-04-20"
updated: "2026-04-20"
```

---

### Resources

**File location:** `content/resources/<slug>.yaml`

```yaml
title: "The Bitcoin Standard"
slug: bitcoin-standard
type: book                       # book | video | podcast | course | article | wallet | tool | exchange | hardware | community
author: Saifedean Ammous         # optional
url: https://saifedean.com/tbs
description: |
  Short description if available.
category: books                  # introductions | meet-bitcoiners | faq | courses | news | videos | podcasts | books | articles | wallets-exchanges | wallets-lightning | wallets-hot | wallets-multisig | wallets-hardware | wallets-full-featured | other-resources | bitcoin-charlotte
difficulty: intermediate         # beginner | intermediate | advanced (optional)
featured: false                  # true to highlight on resources page
created: "2026-04-20"
updated: "2026-04-20"
```

---

### Articles

**File location:** `content/articles/<slug>.yaml`

```yaml
title: "April Meetup Recap: 47 Attendees"
slug: april-meetup-recap-2026
status: published                # draft | published | archived
author: Jacob
date: "2026-04-10"
excerpt: |
  Short summary for listings.
body: |
  ## Full Article Content
  
  Written in markdown. Supports headings, 
  links, lists, bold, italic, etc.
image: /images/articles/april-recap.jpg  # optional
tags:
  - meetup
  - recap
created: "2026-04-10"
updated: "2026-04-10"
```

---

### Pages

**File location:** `content/pages/<slug>.yaml`

```yaml
title: About Bitcoin Charlotte
slug: about
status: published                # published | draft
body: |
  ## Our Mission
  
  Content in markdown...
meta:
  description: "SEO description for search engines"
  og_image: /images/pages/about-og.jpg  # optional
created: "2026-04-20"
updated: "2026-04-20"
```

---

## Important Rules

1. **Slug must match filename.** `great-wagon-road.yaml` → `slug: great-wagon-road`
2. **Always update the `updated` field** when editing a file
3. **Quotes around dates.** Always: `"2026-04-20"`, never `2026-04-20`
4. **Multi-line text uses `|`** (pipe) — keeps line breaks
5. **Don't edit files in `src/`** unless changing design/templates
6. **Images go in `public/images/`** — reference as `/images/filename.jpg`

## Running Locally

```bash
git clone https://github.com/BitcoinCharlotte/website.git
cd website
npm install
npm run dev
```

Site opens at http://localhost:4321

## Branch Strategy

- `dev` — all work happens here (default branch)
- `staging` — promoted from dev via PR, review here
- `main` — production, promoted from staging via PR

**Never push directly to `staging` or `main`.**

## License

MIT — fully open source. Anyone can fork this and run their own Bitcoin community site.
