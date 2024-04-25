#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import * as crypto from "crypto";

// const a = 1n;
// console.log(a);

yargs(hideBin(process.argv))
  .command(
    "serve [port]",
    "start the server",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5000,
      });
    },
    (argv) => {
      if (argv.verbose) console.info(`start server on :${argv.port}`);
      console.log(argv.port);
    }
  )
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  })
  .parse();

export * as ns from "./test";
