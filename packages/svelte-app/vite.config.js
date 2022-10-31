/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import { sveltekit } from "@sveltejs/kit/vite";
import * as dotenv from "dotenv-flow";
import { dirname } from "path";

dotenv.config();

/** @type {import('vite').UserConfig} */
const config = {
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  plugins: [
    sveltekit(),
  ],
  define: {
    "process.env": process.env,
    __dirname: { dirname },
  },
  server: {
    port: 3000,
    open: true,
  },
};

export default config;
