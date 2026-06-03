const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const SITE = path.join(__dirname, '..', 'site');

// --- Load data at startup ---
function loadJSON(name) {
  try {
    return JSON.parse(fs.readFileSync(path.join(SITE, 'data', name), 'utf8'));
  } catch { return []; }
}
const data = {
  businesses: loadJSON('businesses.json'),
  events: loadJSON('events.json'),
  resources: loadJSON('resources.json'),
  pages: loadJSON('pages.json'),
  onboarding: loadJSON('onboarding.json'),
};

// --- Static files ---
app.use('/css', express.static(path.join(SITE, 'css')));
app.use('/js', express.static(path.join(SITE, 'js')));
app.use('/images', express.static(path.join(SITE, 'images')));
app.use('/data', express.static(path.join(SITE, 'data')));
app.use('/fonts', express.static(path.join(SITE, 'fonts')));

// --- Nav links ---
const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Events', path: '/events' },
  { label: 'Resources', path: '/resources' },
  { label: 'Businesses', path: '/businesses' },
  { label: 'Onboarding 100', path: '/onboarding-100' },
];

// --- renderPage ---
function renderPage(title, bodyHtml, activePath = '/') {
  const navItems = NAV_LINKS.map(l => {
    const active = l.path === activePath;
    return `<a href="${l.path}" class="nav-link${active ? ' active' : ''}">${l.label}</a>`;
  }).join('\n            ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Bitcoin Charlotte</title>
  <meta name="description" content="Grassroots Bitcoin adoption in Charlotte, NC">
  <meta property="og:title" content="${title} | Bitcoin Charlotte">
  <meta property="og:description" content="Grassroots Bitcoin adoption in Charlotte, NC">
  <meta property="og:type" content="website">
  <meta property="og:image" content="/images/logo.svg">
  <link rel="icon" href="/images/logo.svg">
  <link rel="stylesheet" href="/css/global.css">
  <script src="/js/btc.js" defer></script>
  <style>
    /* Nav */
    .btc-nav { position: sticky; top: 0; z-index: 100; background: #fff; border-bottom: 2px solid #e2e2ee; padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between; height: 64px; }
    .btc-nav .logo-link { display: flex; align-items: center; text-decoration: none; }
    .btc-nav .nav-links { display: flex; gap: 1.5rem; align-items: center; }
    .btc-nav .nav-link { font-family: 'Bebas Neue', sans-serif; text-transform: uppercase; color: #41449f; text-decoration: none; font-size: 1.1rem; letter-spacing: 0.5px; transition: color .2s; }
    .btc-nav .nav-link:hover, .btc-nav .nav-link.active { color: #F7931A; }
    /* Hamburger */
    .hamburger-toggle { display: none; }
    .hamburger-label { display: none; cursor: pointer; font-size: 1.8rem; color: #41449f; user-select: none; }
    @media (max-width: 768px) {
      .hamburger-label { display: block; }
      .btc-nav .nav-links { display: none; position: absolute; top: 64px; left: 0; right: 0; background: #fff; flex-direction: column; padding: 1rem 1.5rem; border-bottom: 2px solid #e2e2ee; box-shadow: 0 4px 12px rgba(0,0,0,.08); }
      .hamburger-toggle:checked ~ .nav-links { display: flex; }
    }
    /* Footer */
    .btc-footer { background: linear-gradient(135deg, #41449f, #2d2f7a); border-radius: 14px 14px 0 0; color: #fff; padding: 3rem 2rem 1.5rem; margin-top: 3rem; }
    .btc-footer a { color: #F7931A; text-decoration: none; }
    .btc-footer a:hover { text-decoration: underline; }
    .footer-top { display: flex; flex-wrap: wrap; gap: 2rem; margin-bottom: 2rem; }
    .footer-brand { flex: 1 1 250px; }
    .footer-brand p { opacity: .85; margin-top: .5rem; font-size: .95rem; }
    .footer-col { flex: 1 1 160px; }
    .footer-col h4 { font-family: 'Bebas Neue', sans-serif; text-transform: uppercase; margin-bottom: .75rem; font-size: 1.1rem; letter-spacing: .5px; }
    .footer-col ul { list-style: none; padding: 0; margin: 0; }
    .footer-col li { margin-bottom: .4rem; font-size: .9rem; }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,.2); padding-top: 1rem; text-align: center; font-size: .85rem; opacity: .75; }
  </style>
</head>
<body>
  <nav class="btc-nav">
    <a href="/" class="logo-link"><img src="/images/logo.svg" alt="Bitcoin Charlotte" height="40"></a>
    <input type="checkbox" id="hamburger" class="hamburger-toggle" hidden>
    <label for="hamburger" class="hamburger-label">&#9776;</label>
    <div class="nav-links">
      ${navItems}
    </div>
  </nav>

  <main class="btc-page">
    ${bodyHtml}
  </main>

  <footer class="btc-footer">
    <div class="footer-top">
      <div class="footer-brand">
        <img src="/images/logo.svg" alt="Bitcoin Charlotte" height="36" style="filter:brightness(10)">
        <p>Grassroots Bitcoin adoption in Charlotte, NC</p>
      </div>
      <div class="footer-col">
        <h4>Navigate</h4>
        <ul>
          ${NAV_LINKS.map(l => `<li><a href="${l.path}">${l.label}</a></li>`).join('\n          ')}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Community</h4>
        <ul>
          <li><a href="https://meetup.com/bitcoincharlotte" target="_blank" rel="noopener">Meetup</a></li>
          <li><a href="https://t.me/+0GOZLahvOPhlZmIx" target="_blank" rel="noopener">Telegram</a></li>
          <li><a href="https://primal.net/bitcoincharlotte" target="_blank" rel="noopener">Nostr</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Follow Us</h4>
        <ul>
          <li><a href="https://x.com/Bitcoin_CLT" target="_blank" rel="noopener">X</a></li>
          <li><a href="#" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="#" target="_blank" rel="noopener">Facebook</a></li>
          <li><a href="#" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      MIT License · Open Source · Paid for with ₿
    </div>
  </footer>
</body>
</html>`;
}

// --- Helper: read page file ---
function readPage(filename) {
  try {
    return fs.readFileSync(path.join(SITE, 'pages', filename), 'utf8');
  } catch {
    return '<section style="text-align:center;padding:4rem"><h1>Page Not Found</h1><p>This page is coming soon.</p></section>';
  }
}

// --- Page routes ---
const pageRoutes = [
  { path: '/',                  file: 'home.html',            title: 'Home' },
  { path: '/events',            file: 'events.html',          title: 'Events' },
  { path: '/resources',         file: 'resources.html',       title: 'Resources' },
  { path: '/businesses',        file: 'businesses.html',      title: 'Businesses' },
  { path: '/articles',          file: 'articles.html',        title: 'Articles' },
  { path: '/onboarding-100',    file: 'onboarding-100.html',  title: 'Onboarding 100' },
  { path: '/business/onboarding-100-initiative', file: 'onboarding-100.html', title: 'Onboarding 100 Businesses', activePath: '/onboarding-100' },
  { path: '/about',             file: 'about.html',           title: 'About' },
  { path: '/community-support', file: 'community-support.html', title: 'Community Support' },
  { path: '/bitcoin-21-pages',  file: 'bitcoin-21-pages.html', title: 'Bitcoin 21 Pages' },
];

pageRoutes.forEach(route => {
  app.get(route.path, (req, res) => {
    const html = readPage(route.file);
    res.send(renderPage(route.title, html, route.activePath || route.path));
  });
});

// --- Business detail route ---
app.get('/businesses/:slug', (req, res) => {
  const biz = (Array.isArray(data.businesses) ? data.businesses : []).find(
    b => b.slug === req.params.slug
  );
  if (!biz) {
    return res.status(404).send(renderPage('Not Found',
      '<section style="text-align:center;padding:4rem"><h1>Business Not Found</h1><p><a href="/businesses">← Back to Businesses</a></p></section>',
      '/businesses'));
  }

  const badges = (biz.badges || biz.tags || [])
    .map(b => `<span style="display:inline-block;background:#F7931A;color:#fff;padding:.25rem .75rem;border-radius:20px;font-size:.85rem;margin:.25rem">${b}</span>`)
    .join('');

  const logo = biz.logo
    ? `<img src="${biz.logo}" alt="${biz.name}" style="max-height:80px;margin-bottom:1rem">`
    : '';

  const links = [];
  if (biz.website) links.push(`<a href="${biz.website}" target="_blank" rel="noopener" style="color:#41449f;margin-right:1rem">🌐 Website</a>`);
  if (biz.btcmap || biz.btcMap) links.push(`<a href="${biz.btcmap || biz.btcMap}" target="_blank" rel="noopener" style="color:#F7931A">🗺 BTC Map</a>`);

  const neighborhood = biz.neighborhood ? `<p style="color:#666;margin-bottom:1rem">📍 ${biz.neighborhood}</p>` : '';

  const bodyHtml = `
    <section style="max-width:720px;margin:2rem auto;padding:0 1.5rem">
      <a href="/businesses" style="color:#41449f;text-decoration:none;font-size:.9rem">← All Businesses</a>
      <div style="margin-top:1.5rem">
        ${logo}
        <h1 style="font-family:'Bebas Neue',sans-serif;color:#41449f;font-size:2.2rem;margin:0">${biz.name}</h1>
        ${neighborhood}
        <div style="margin:.75rem 0">${badges}</div>
        <p style="line-height:1.7;color:#333">${biz.description || ''}</p>
        <div style="margin-top:1.5rem">${links.join('')}</div>
      </div>
    </section>`;

  res.send(renderPage(biz.name, bodyHtml, '/businesses'));
});

// --- API routes ---
app.get('/api/businesses', (req, res) => res.json(data.businesses));
app.get('/api/events', (req, res) => res.json(data.events));
app.get('/api/resources', (req, res) => res.json(data.resources));
app.get('/api/pages', (req, res) => res.json(data.pages));
app.get('/api/onboarding', (req, res) => res.json(data.onboarding));

// --- 404 ---
app.use((req, res) => {
  res.status(404).send(renderPage('404',
    '<section style="text-align:center;padding:4rem"><h1>404 — Page Not Found</h1><p><a href="/" style="color:#41449f">Go Home</a></p></section>',
    ''));
});

// --- Start ---
app.listen(PORT, () => {
  console.log(`⚡ Bitcoin Charlotte running on http://localhost:${PORT}`);
  console.log(`  Data: ${Object.entries(data).map(([k,v]) => `${k}(${Array.isArray(v)?v.length:0})`).join(', ')}`);
});

module.exports = app;
