/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import { sveltekit } from "@sveltejs/kit/vite";
import copy from "rollup-plugin-copy";
import * as dotenv from "dotenv-flow";
import { createRequire } from "module";
import { dirname } from "path";
import * as packageJson from "./package.json";

dotenv.config();

// used to require cjs config in esm.
// NOTE dynamic import() cjs technically works, but timestamp query cache bust
// have no effect, likely because it has another internal cache?
let esmRequire;

const _require = import.meta.url
  ? (esmRequire ??= createRequire(import.meta.url))
  : require;

const iTwinDeps = Object.keys(packageJson.dependencies)
  .filter((pkgName) => pkgName.startsWith("@itwin"))
  // .map((pkgName) => _require.resolve(pkgName))
  // .map((pkgPath) => `${pkgPath}/lib/public/**`);
  .map((pkgName) => `./node_modules/${pkgName}/lib/public/**`);

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
    copy({
      targets: [
        {
          src: iTwinDeps,
          dest: "/static",
          rename: (_name, _extension, fullPath) => {
            console.log(fullPath);
            const regex = new RegExp("(public(?:\\\\|/))(.*)");
            return regex.exec(fullPath)[2];
          },
        },
      ],
      verbose: true,
      overwrite: true,
    }),
  ],
  define: {
    "process.env": process.env,
    __dirname: { dirname },
  },
  server: {
    port: 3000,
  },
};

export default config;
