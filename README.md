# MERN boilerplate

 I had inspiration for this boilerplate because I come across a lot of others that use a ploy-repo when nesting `create-react-app` into a `express` server and don't quite meet the requirements I've sought. I wanted to keep all dependencies at root level with one `package.json` file. I'm learning and trying some different concepts to file structures, dependency management, and integration testing. Along with CI/CD into a single cloud service delivering production builds of both Express and React applications on a single instance container.

## Tech stack

- React 18
- Express 4
- TypeScript 4
- Webpack 5

## Development use

### System requirements

- Docker Compose
- Node.js
- Yarn

Start up MongoDB docker container by running command

```bash
docker-compose up -d
```

### Node Scripts

Start the full stack development application by running command

```bash
yarn start
```

Start the backend API server only by running command

```bash
yarn start:server
```

Start the frontend client only by running command

```bash
yarn start:client
```

## Features

- Development build watching changes with automatic live reloading
- Pre-commit hook enforcing linting rules
- TailwindCSS added for React
- React env file usage based on environment. ie Production, Development
- Production build both apps into single output directory.

## Final goals

- production build into SSR/SSG
- local & social-media strategies for authentication and session management
- global state management with Redux
