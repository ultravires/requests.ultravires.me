# Showcase your Open Source Contributions 🤍

Create a website with an RSS feed of your recent GitHub pull requests across the Open Source projects you contribute to.

![atinux-pull-requests](https://github.com/user-attachments/assets/cfa82cc2-51af-4fd4-9012-1f8517dd370f)

Demo: https://prs.atinux.com

> NuxtHub Admin was sunset on December 31st, 2025. This fork deploys directly to Cloudflare Pages via Wrangler — see the [Deploy](#deploy) section below.

## Features

- List the 50 most recent pull requests you've contributed to.
- RSS feed
- Only add your GitHub token to get started
- Deployable to Cloudflare's global edge network for free

## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack):

```bash
pnpm install
```

Copy the `.env.example` file to `.env` and fill in your GitHub token:

```bash
cp .env.example .env
```

Create a GitHub token with no special scope on [GitHub](https://github.com/settings/personal-access-tokens/new) and set it in the `.env` file:

```bash
NUXT_GITHUB_TOKEN=your-github-token
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

## Deploy

The project deploys to **Cloudflare Pages** using [Wrangler](https://developers.cloudflare.com/workers/wrangler/).
Server-side caching for `defineCachedEventHandler` / `defineCachedFunction` is backed by a Cloudflare **KV** namespace bound as `CACHE` (configured in `nuxt.config.ts` via `nitro.storage.cache`).

### One-time setup

1. Authenticate Wrangler with your Cloudflare account:

   ```bash
   pnpm dlx wrangler login
   ```

2. Create the KV namespace used by the cache:

   ```bash
   pnpm dlx wrangler kv namespace create CACHE
   ```

   Copy the returned `id` (and optional `preview_id`) into `wrangler.toml`, replacing the `REPLACE_WITH_YOUR_KV_NAMESPACE_ID` placeholder.

3. Set your GitHub token as a Pages secret (don't commit it):

   ```bash
   pnpm dlx wrangler pages secret put NUXT_GITHUB_TOKEN --project-name requests-ultravires-me
   ```

### Deploy

Build and deploy in one step:

```bash
pnpm deploy
```

That runs `nuxi build` (which emits `dist/_worker.js` via Nitro's `cloudflare-pages` preset) and `wrangler pages deploy dist`.

### Preview the production bundle locally

```bash
pnpm preview:cf
```

Equivalent to `wrangler pages dev dist`.

### Continuous deployment via Cloudflare Pages

Alternatively, connect the repository in the Cloudflare Pages dashboard with:

- Build command: `pnpm build`
- Build output directory: `dist`
- Root directory: project root (default)
- Environment variable: `NUXT_GITHUB_TOKEN`
- KV binding: `CACHE` → the namespace created above

## Credits

This project is inspired by [Anthony Fu](https://github.com/antfu)'s [releases.antfu.me](https://github.com/antfu/releases.antfu.me) project.

## License

[MIT](./LICENSE)
