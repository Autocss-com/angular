# AutoCSS demo — Angular data layer

A standard **Angular** instance (standalone component, signals, `HttpClient`)
that renders its own sample data. It is the Angular back-end reference for the
[AutoCSS](https://autocss.com) remote-rendering demo: *have UI, bring your own
data — one UI, many back-ends.*

**Stage 1 (this repo today):** the app fetches `public/data/records.json` — the
same JSON shape the AutoCSS UI consumes (`[{ id, title, intro, items: [] }]`) —
and renders it as a table with loading/error states. No AutoCSS attached yet.

**Stage 2 (later):** the remote AutoCSS UI is attached to render this same data.

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
