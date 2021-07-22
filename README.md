# Pagination Issue

## Development

Install packages

```
yarn
```

Run dev environment

```
yarn start
```

## Result

"Next" button is disabled on page 2 (while total page is 4)

## Expectation

"Next" button should not be disabled on page 2

## How to resolve this

Downgrade `gastby` and `gatsby-source-filesystem` version to `3.7`

```
yarn upgrade gatsby@^3.7.2 gatsby-source-filesystem@^3.7.1
```
