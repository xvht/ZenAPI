# README

## Project Overview

This project, named "controller", is a Cloudflare Workers application. It uses the Wrangler CLI for deployment and the `discord-webhook-node` package to interact with Discord webhooks.

## How It Works

The main entry point of the application is [`src/index.js`](command:_github.copilot.openRelativePath?%5B%22src%2Findex.js%22%5D "src/index.js"). The application is configured to be compatible with Node.js, as specified in the [`wrangler.toml`](command:_github.copilot.openRelativePath?%5B%22wrangler.toml%22%5D "wrangler.toml") file.

The application interacts with a bucket named 'database' in production and 'card' in preview mode. The bucket is bound to the worker with the binding name 'BUCKET'.

## Deployment

Before deploying, make sure you have [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update) installed globally in your system. If not, you can install it using npm:

```sh
npm i -g @cloudflare/wrangler
```

- To deploy the application, use the following command:

```sh
yarn publish
```

- This command will publish your Worker to the specified `account_id` in the [`wrangler.toml`] file.

## Secrets

This project uses two secrets: `AUTH_KEY_SECRET` and `WEBHOOK`. You can set these secrets using the following commands:

```sh
yarn secret
```

```sh
yarn hook
```

- You will be prompted to enter the secret text for each command.

## Development

To start the development server, use the following command:

```sh
yarn dev
```

- This command will start the server and any changes you make to your project files will be reflected in real-time.

## Dependencies

This project uses `discord-webhook-node` to interact with Discord webhooks.

- The dependencies can be installed using either npm or yarn:

```sh
yarn install
```

or

```sh
npm install
```

- Please ensure that you have the correct Node.js version installed on your system for compatibility.
