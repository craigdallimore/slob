## Slob

:snail:

Trying out a bunch of libraries and tools to see how well they fit together.

### To start the webserver

Available at [http://127.0.0.1:8080](http://127.0.0.1:8080)

```
nodemon server.js
```

### To start webpack in dev mode

This will start a webpack dev server, which will proxy the actual site from
[another address](http://localhost:3333) (and serve the webpacked assets itself).

```
npm run dev
```

### To deploy assets

This will write asset files (html, css, js) to the `./dist` folder.

```
npm run deploy
```

:dancer:

## Goals

- [x] Hot Module Replacement :fire:
- [x] Code splitting on modules
- [x] i18n
- [x] No `../../../`
- [x] Modernizr
- [x] Example test
- [x] Dev: JS Sourcemaps
- [x] Prod: Minified assets
- [x] Dev: SCSS Sourcemaps
- [ ] Code splitting on routes
- [ ] A lazy loaded widget example
- [x] Prod: separate config
- [x] Prod: No sourcemaps
- [x] Prod: Cachebusting
