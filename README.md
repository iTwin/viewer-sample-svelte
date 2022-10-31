# Svelte iTwin Viewer Sample

A Svelte implementation of the iTwin Viewer. Created with [SvelteKit](https://kit.svelte.dev/).

## Getting Started

1. Run `pnpm install` at the root of the repo.
2. Run `pnpm build` at the root of the repo.
3. Make a copy of the `.env` file under `packages/svelte-viewer/` and name it `.env.local`. Fill in the missing variables. At a minimum, all auth client information as well as an iTwinId and iModelId are required to run the application. If you do not already have an iTwin application client id, you can obtain one [here](https://developer.bentley.com/register/).
4. Run `pnpm start` at the root of the repo. The application will automatically reload if you change any of the source files.
5. Navigate to `http://localhost:3000` in your browser.
