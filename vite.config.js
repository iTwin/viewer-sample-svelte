import { sveltekit } from "@sveltejs/kit/vite";
import * as dotenv from "dotenv-flow";

dotenv.config();

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  define: {
    "process.env": process.env,
  },
  server: {
    port: 3000,
  },
};

export default config;
