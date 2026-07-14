# AutoCSS demo — Angular data layer

A standard **Angular** app that renders its own data inside the remote
**[AutoCSS](https://autocss.com)** UI — *have UI, bring your own data.* The app
ships the data; AutoCSS (loaded from `https://autocss.com`) is the whole UI.

**Live:** <https://autocss-com.github.io/angular/>

## Run

```bash
npm install
npm start
```

## Build & deploy

```bash
npm run build   # → dist/autocss-angular-demo/browser (built with --base-href /angular/)
```

Pushing to `main` auto-builds and deploys to GitHub Pages via
`.github/workflows/deploy.yml`.

## Using AutoCSS in an Angular app

Starting from a stock `ng new` app, the whole integration is just a few small
touches:

1. **Link the AutoCSS styles** — add the `https://autocss.com/assets/css/…`
   stylesheets to `src/index.html`.
2. **Make `<app-container>` the root** — set the component `selector` to
   `'app-container'` and put `<app-container></app-container>` in `src/index.html`.
   The template renders the AutoCSS scaffold, with your content inside `<article>`.
3. **Allow the `app-*` custom elements** — add
   `schemas: [CUSTOM_ELEMENTS_SCHEMA]` to the component.
4. **Bring your data** — fetch it (here `public/data/records.json` via `HttpClient`)
   and render.

_(Full change history: [`progress/`](./progress).)_
