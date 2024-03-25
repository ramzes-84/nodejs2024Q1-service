# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/).

## Downloading

```
git clone https://github.com/ramzes-84/nodejs2024Q1-service.git
```

## Choosing branch

```
git checkout docker-improve
```

## Creating .env file

Create a new .env file and copy the content of .env.example there

## Installing NPM modules

```
npm install
```

## Docker containerization

```
docker compose watch
```

After starting the app on port (4000 as default) you can open
in your browser http://localhost:4000/ to check the server.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
