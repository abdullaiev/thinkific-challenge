# thinkific-challenge

A simple weather forecast app. Key features:
* Location search using Google Places AutoCompletion API
* Five day detailed weather forecast using OpenWeatherMap API.
* Instant toggle between C&deg; and F&deg;.

Check out live demo at [GitHub Pages](https://abdullaiev.github.io/thinkific-challenge/).

# Getting started locally
Follow these simple steps to start up the application locally:
1. Install NodeJS from https://nodejs.org/en/.
2. Checkout this project and cd into its folder.
3. Run `npm i`.

# Supported commands
 
| Command                           | Description                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------|
| `npm start`                       | Start the app at http://localhost:4200.                                                               |
| `npm test`                        | Run unit tests in watch mode                                                                          |
| `npm run-script test:coverage`    | Run unit tests and generate code coverage report to `./coverage/thinkific-challenge/index.html`       |
| `npm run-script lint`             | Lint TS files.                                                                                        |
| `npm run-script build`            | Run unit tests, lint TS files, generate production-ready code in `./dist` folder.                     |
| `npm run-script deploy`           | Same as `npm run-script build`, but copies generated code to `./docs` for GitHub pages deployment.    |
