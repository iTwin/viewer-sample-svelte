/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { registerTool } from "@itwin/core-extension";
import { SelectionTool } from "./SelectTool";

export default function main() {
  void registerTool(SelectionTool);
  console.log("Select tool extension loaded."); // eslint-disable-line no-console
}
