#!/usr/bin/env node
"use strict";
process.env.NVIM_NODE_LOG_LEVEL = "error";

const path = require("path");

(async function () {
  const nvim = await require("neovim/scripts/nvim.js");
  const _files = process.argv.slice(2);
  if (_files.length === 0) {
    console.error("neovim-e requires at-least one file input, but got none");
    process.exit(1);
  }

  const files = [];
  for (const file of _files) {
    if (path.isAbsolute(file) === false) {
      files.push(path.join(process.cwd(), file));
    } else {
      files.push(file);
    }
  }

  await nvim.command(`edit ${files.join(" ")}`);

  const disconnect = new Promise((resolve) => nvim.on("disconnect", resolve));

  nvim.transport.writer.end();
  nvim.transport.reader.end();

  await disconnect;
})();
