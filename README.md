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

- [ ] Route loading (not just module loading)
- [ ] Widget example
- [ ] Deploy mode
  - [ ] separate config
  - [ ] no sourcemaps
  - [ ] cachebusting
