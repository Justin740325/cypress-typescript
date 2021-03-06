# This Docker file is for building this project on Codeship Pro
# https://documentation.codeship.com/pro/languages-frameworks/nodejs/

# use Cypress provided image with all dependencies included
FROM cypress/base:10
RUN node --version
RUN npm --version
WORKDIR /home/node/app
# copy our test application
# copy Cypress tests
COPY cypress.json cypress ./
COPY cypress ./cypress
COPY package.json package-lock.json ./
COPY renovate.json ./
COPY tsconfig.json tsconfig.lint.json ./
COPY jest.config.js ./

# avoid many lines of progress bars during install
# https://github.com/cypress-io/cypress/issues/1243
ENV CI=1

# install NPM dependencies and Cypress binary
RUN npm ci
# check if the binary was installed successfully
RUN $(npm bin)/cypress verify

RUN $(npm bin)/npm install --save typescript

RUN $(npm bin)/npm run start
RUN $(npm bin)/npm run cy-db



