import { sveltekit } from "@sveltejs/kit/vite";
import * as dotenv from "dotenv-flow";
import { dirname } from "path";

dotenv.config();

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  define: {
    "process.env": process.env,
    __dirname: { dirname },
  },
  server: {
    port: 3000,
    fs: {
      allow: ["./extensions"],
    },
  },
};

export default config;
