# IG Images frontend <!-- badges -->

The web interface for FT staff to upload to IG Images. (See also: [IG Images backend](https://github.com/ft-interactive/ig-images).)

## Overview

This front-end can perform authentication entirely client-side. If it determines that you are not logged in (either because you have no token in localStorage, or because you have

## Development

### Local setup

Clone this repo and run `yarn install`.

To develop, run `yarn start`. This builds code incrementally from `src` to `dist`, and serves the contents of `dist` over HTTP (see terminal output for the port number).

## Continuous deployment

CircleCI automatically tests, builds and deploys to S3 this repo via `ft-graphics-deploy`.

The rolling `master` deployment is proxied through `https://ig.ft.com/ig-images/`.
