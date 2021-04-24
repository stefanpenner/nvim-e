#!/usr/bin/env node
"use strict";
process.env.NVIM_NODE_LOG_LEVEL = "error";

const path = require("path");

(async function () {
  const _files = process.argv.slice(2);
  if (_files.length === 0) {
    console.error("neovim-e requires at-least one file input, but got none");
    process.exitCode = 1;
    return;
  }

  const files = [];
  for (const file of _files) {
    if (path.isAbsolute(file) === false) {
      files.push(path.join(process.cwd(), file));
    } else {
      files.push(file);
    }
  }

  const nvim = await require("neovim/scripts/nvim.js");
  await nvim.command(`edit ${files.join(" ")}`);
  const buffer = await nvim.buffer;

  // TODO: support N buffers
  await new Promise((resolve) => {
    // when the opened buffer closes, exist.
    buffer.listen("detach", resolve);
  });

  // TODO: I couldn't find a more reasonable way to "detach" the node-client
  // from nvim, without existing nvim.
  nvim.transport.writer.end();
  nvim.transport.reader.end();
})();
