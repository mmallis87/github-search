# github-search
Live demo 🚀: https://github-query.surge.sh/

A serverless Github repository search SPA using `Preact` and `antd`.

Note: the number of libraries used in this project is kept intentionally small to showcase how easy is to implement various features such as data fetching, pagination and live search.

## CLI Commands

```shell script
# install dependencies
yarn # or npm install

# serve with hot reload at localhost:8080
yarn run dev # or npm run dev

# build for production with minification
yarn run build # or npm run build

# test the production build at localhost:8080
yarn run serve # or npm run serve

# run tests with jest, enzyme and preact-render-spy
yarn run test # or npm run test
```

## Code guide
At the root of the project there are projects files to manage dependencies and development scripts as well as config files to enforce a clean code and usage of consistent coding conventions. We use Airbnb Javascript style with some minor tweaks.

The folder `tests/` holds scripts for testing using `Enzyme` on top of `Jest`.

The folder `build/` is the output of `build` script command. It contains a static website that can be deployed on the edge. In this project we use [Surge](https://github-query.surge.sh).

The folder `src/` contains the source code and is broken into the following:
- `assets`: static assets and only icons so far
- `components`: React UI components grouped by shared semantics
- `pages`: contains various application "pages"
- `services`: contains all external services used across the application (so far only Github Rest API service)
- `style`: CSS rules used across the application
- `util`: misc constants, helper functions and string literal templates used across the application

## Todo list
- [ ] Cache Github objects that don't change frequently (such a `User`)
- [ ] Introduce `async` preloading of repos details once the repos list is fetched from Github
- [ ] Measure and increase test coverage (using `coveralls`)
- [ ] Add unit tests for helper functions
- [ ] Add mock tests external services
- [ ] Add integration tests
- [ ] Split `index.css` into `global.css` and `<component.css>`
- [ ] Use a css-in-js framework such as emotion
- [ ] Introduce a `Layout` component to enforce consistent layout across pages
- [ ] Add `index.js` to each subfolder of components to act as an interface between the components in the subfolder and the rest of the project. This make components more reusable
- [ ] Perform an initial SEO pass

## Copyright
Copyright © 2020 Majid Mallis
