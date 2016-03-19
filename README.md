## Slob

Trying out a bunch of libraries and tools to see how well they fit together.

### To start the webserver

```
nodemon server.js
```

### To start webpack in dev mode

This will start a webpack dev server, which will proxy the actual site from
another address (and serve the webpacked assets itself).

```
npm run dev
```

### To deploy assets

```
// TODO
```


## Goals

- [] postcss autoprefixing
- [] i18n Translations
- [] Route loading (not just module loading)
- [] Find a way to customise the jsonP thing in webpack
- [] Tests with Jest
- [] No ../../../
- [] Widget example
- [] Deploy mode
 -- separate config
 -- no sourcemaps
 -- cachebusting

- want to go to a route and get
  - a point where we can check auth
  - a temporary loading view!
  - check the _data_ is available, and either show the loaded view or an empty state

