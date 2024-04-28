#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs";
import path from "path";
import { existKey } from "./existKey";
import { KeyNameEnum } from "./KeyName.enum";
import { updateConfig } from "./updateConfig";
import { getKey } from "./getKey";
import { validate } from "./validate";

const CONFIG_FILE = "config.json";

yargs(hideBin(process.argv))
  .command({
    command: "config",
    describe: "Config command",
    builder(yargs) {
      return yargs.option("path", {
        alias: "p",
        description: "Set private_key storage location",
        demandOption: true, // 必传传入 `path` 参数，即：`--path` 或 `-p` 必须要有
        requiresArg: true, // 是否必填参数
        nargs: 1, // 限制 `-p` 后面的参数个数，表示 `-p [xxx]` 里的 xxx
        type: "string",
        normalize: true, // 开启时，会基于本机操作系统自动转换路径，比如在 windows 上输入：`d:/`，会转为 `d:\`
      });
    },
    handler(args) {
      const p = args.p as string;
      if (!path.isAbsolute(p)) {
        return console.log(`${p} is not an absolute path`);
      }
      if (!fs.existsSync(p)) {
        return console.log(`${p} is not a valid path`);
      }
      if (!existKey(p, KeyNameEnum.PUBLIC)) {
        return console.log(`${KeyNameEnum.PUBLIC} file not found in ${p}`);
      }
      if (!existKey(p, KeyNameEnum.PIRVATE)) {
        return console.log(`${KeyNameEnum.PIRVATE} file not found in ${p}`);
      }
      const success = updateConfig({ keyDir: p }, CONFIG_FILE);
      if (!success) {
        return console.log("Update config failed");
      }
      console.log("Successfully");
    },
  })
  .command({
    command: "$0",
    describe: "Encrypt text",
    builder(yargs) {
      return yargs.option("encrypt", {
        alias: "e",
        description: "Encrypt plain text with private_key",
        demandOption: true,
        requiresArg: true,
        nargs: 1,
        type: "string",
      });
    },
    handler(args) {
      validate(CONFIG_FILE);
      const text = args.e as string;
      // getKey();
      console.log(text);
    },
  })
  .version()
  .alias("v", "version")
  .help()
  .alias("h", "help")
  .parse();
