# AutoCSS demo — Angular data layer

A standard **Angular** instance (standalone component, signals, `HttpClient`)
that renders its own sample data inside the **remote [AutoCSS](https://autocss.com)
UI scaffold**. It is the Angular back-end reference for the AutoCSS
remote-rendering demo: *have UI, bring your own data — one UI, many back-ends.*

- **Data layer:** the app fetches `public/data/records.json` — the same JSON
  shape the AutoCSS UI consumes (`[{ id, title, intro, items: [] }]`) — and
  renders it as a table with loading/error states.
- **AutoCSS attach (styles):** the page includes the default AutoCSS Holy-Grail
  HTML scaffold and links the AutoCSS stylesheets remotely from
  `https://autocss.com`. The app's own content-level elements live inside
  `<article>`. (The AutoCSS JS runtime is **not** wired yet — styles only.)

## Develop

```bash
npm install
npm start        # ng serve
```

## Build

```bash
npm run build    # ng build --base-href /angular/ -> dist/autocss-angular-demo/browser
```

## Deploy

On push to `main`, a GitHub Actions workflow builds and publishes
`dist/autocss-angular-demo/browser` to GitHub Pages:
<https://autocss-com.github.io/angular/>

---

## Changes from the default scaffold

> Baseline = a fresh `ng new` (Angular CLI 20; `--style=css --routing=false
> --ssr=false`). This is the **complete** list of what had to change to render
> the app's own data and to drop it into the remote AutoCSS UI. Nothing else was
> modified, and **no third-party libraries were added.**

### Data layer
- **Added `public/data/records.json`** — the sample dataset (AutoCSS contract
  shape). The Angular application builder copies `public/` to the output root, so
  it deploys as `data/records.json`.
- **`src/app/app.ts`** — the standalone `App` component fetches `data/records.json`
  via `HttpClient` (a document-base-relative path that resolves against
  `<base href="/angular/">`), holds `status`/`records` in **signals** with
  `record`/`columns` `computed`, and the template renders a `<table>` with
  `@if`/`@for` control flow.
- **`src/app/app.config.ts` — added `provideHttpClient()`** (a fresh standalone
  app does not provide `HttpClient` by default).

### AutoCSS scaffold + remote styles
- **`src/index.html`** — added the block of remote AutoCSS stylesheet `<link>`s
  (`https://autocss.com/assets/css/*.css`) in the same `@layer`-cascade order as
  `autocss/index.html` (`reset, fonts, color-scheme, color-theme-66ccff, layout,
  inputs, media, typography, scrolling, a11y, forms, fallbacks, loading`;
  `themes.css` + `transitions.css` left commented out to mirror the source).
- **`src/app/app.html`** — renders the default AutoCSS Holy-Grail scaffold
  (`<app-container>` → `<app-banner>`, `<header>`, `<nav>`, `<main><article>`,
  `<aside>`, `<footer>`, trailing `<app-banner>`), with the data-driven
  content-level elements (`h1`, tagline, `h2`, intro, `<table>`) placed **inside
  `<article>`**.

### Angular-specific wiring (the gotchas)
- **`src/app/app.ts` — `schemas: [CUSTOM_ELEMENTS_SCHEMA]` (required).** Without
  it Angular's template compiler errors (`'app-container' is not a known element`)
  on every AutoCSS custom element. Adding the schema lets the `app-*` tags render
  as native custom elements.
- **`src/styles.css` — `app-root { display: contents }`.** Angular mounts the
  component inside `<app-root>` (inline by default); `display: contents` lets
  `<app-container>` be the Holy-Grail grid root that AutoCSS's `layout.css`
  styles.
- **Removed the emulated `:host { display: block }` from `src/app/app.css`.**
  Angular compiles `:host` to an attribute selector (specificity `0,1,0`) that
  beats the global `app-root` type selector (`0,0,1`), so leaving it would
  override the `display: contents` above.
- Static `checked` attributes on the "Layouts" checkbox and "System" radio work
  as-is; glyphs (`☼ ☾ ◐ ✖`) are written as HTML entities in the template.

### Build / GitHub Pages
- **`package.json` — `build` script is `ng build --base-href /angular/`** so the
  built `index.html` carries `<base href="/angular/">` for project Pages hosting.
- **Added `.github/workflows/deploy.yml`** — `npm ci` → `npm run build` → deploy
  **`dist/autocss-angular-demo/browser`** to Pages (triggers on push to `main`).
  Requires repo **Settings → Pages → Source = GitHub Actions**.

### Version note
- Scaffolded with **Angular CLI 20** rather than the latest. The build
  environment's Node (22.22.2) is just below the CLI 21/22 engine floor
  (≥ 22.22.3); the GitHub Actions runner's newer Node 22.x builds it fine and the
  lockfile pins the toolchain.

### Housekeeping
- `package.json` name → `autocss-angular-demo`.
- Appended a Node/Angular section to `.gitignore`.
