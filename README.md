# WIP: IG Images frontend [![CircleCI](https://circleci.com/gh/Financial-Times/ig-images-frontend.svg?style=svg)](https://circleci.com/gh/Financial-Times/ig-images-frontend)

The web interface for FT graphics staff to upload to IG Images. (See also: [IG Images backend](https://github.com/Financial-Times/ig-images-backend).)

## Continuous deployment

CircleCI automatically tests, builds and deploys to S3 this repo via [ft-graphics-deploy](https://github.com/ft-interactive/ft-graphics-deploy).

The rolling `master` deployment is proxied through `https://ig.in.ft.com/ig-images/`.
