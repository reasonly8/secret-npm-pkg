#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import fs, { writeFileSync } from "fs";
import path from "path";
import { merge } from "lodash-es";
import crypto from "crypto";
import type { Config } from "./index.d";

const CONFIG_FILE = "config.json";
const enum KeyNameEnum {
  PUBLIC = "public_key",
  PIRVATE = "private_key",
}

yargs(hideBin(process.argv))
  .command({
    command: "config",
    describe: "Config command",
    builder(yargs) {
      return yargs
        .option("path", {
          alias: "p",
          description: "Set private_key storage location",
          // demandOption: true, // 必传传入 `path` 参数，即：`--path` 或 `-p` 必须要有
          requiresArg: true, // 是否必填参数
          nargs: 1, // 限制 `-p` 后面的参数个数，表示 `-p [xxx]` 里的 xxx
          type: "string",
          normalize: true, // 开启时，会基于本机操作系统自动转换路径，比如在 windows 上输入：`d:/`，会转为 `d:\`
        })
        .option("clear", {
          alias: "c",
          description: "Clear config",
          requiresArg: false,
          nargs: 0,
          type: "boolean",
        });
    },
    handler(args) {
      if (!args.path && !args.clear) {
        yargs().showHelp();
        return;
      }
      if (args.path) {
        const p = args.path as string;
        if (!path.isAbsolute(p)) {
          return console.log(`${p} is not an absolute path`);
        }
        if (!fs.existsSync(p)) {
          return console.log(`${p} is not a valid path`);
        }
        if (!fs.existsSync(path.join(p, KeyNameEnum.PUBLIC))) {
          return console.log(`${KeyNameEnum.PUBLIC} file not found in ${p}`);
        }
        if (!fs.existsSync(path.join(p, KeyNameEnum.PIRVATE))) {
          return console.log(`${KeyNameEnum.PIRVATE} file not found in ${p}`);
        }
        const configPath = path.join(import.meta.dirname, CONFIG_FILE);
        if (!fs.existsSync(configPath)) {
          fs.writeFileSync(
            configPath,
            JSON.stringify({ keyDir: "", names: {} })
          );
        }
        const rawConfig = fs.readFileSync(configPath).toString();
        const oldConfig = JSON.parse(rawConfig) as Config;
        const newConfig = merge(oldConfig, { keyDir: p });
        fs.writeFileSync(configPath, JSON.stringify(newConfig));
        console.log("Successfully");
      }

      if (args.clear) {
        const configPath = path.join(import.meta.dirname, CONFIG_FILE);
        fs.writeFileSync(configPath, JSON.stringify({ keyDir: "", names: {} }));
        console.log("Successfully");
      }
    },
  })
  .command({
    command: "$0",
    describe: "Encrypt text",
    builder(yargs) {
      return yargs
        .option("encrypt", {
          alias: "e",
          description: "Encrypt plain text with private_key",
          requiresArg: true,
          nargs: 1,
          type: "string",
        })
        .option("decrypt", {
          alias: "d",
          description: "Decrypt text with public_key",
          requiresArg: true,
          nargs: 1,
          type: "string",
        })
        .option("save", {
          alias: "s",
          description: "Save frequently used text",
          requiresArg: true,
          nargs: 1,
          type: "string",
        })
        .option("list", {
          alias: "l",
          description: "Show names",
          requiresArg: false,
          nargs: 0,
          type: "boolean",
        })
        .option("name", {
          alias: "n",
          description: "Decrypt by name",
          requiresArg: true,
          nargs: 1,
          type: "string",
        });
    },
    handler(args) {
      if (args.save && !args.decrypt) {
        console.log(`Usage example: secret -d <encrypted_data> -s sayHello`);
        return;
      }

      if (!args.decrypt && !args.encrypt && !args.list && !args.name) {
        yargs().showHelp();
        return;
      }

      const configPath = path.join(import.meta.dirname, CONFIG_FILE);
      if (!fs.existsSync(configPath)) {
        return console.log(
          "Please use `secret config -p <config_dir>` at first."
        );
      }
      const rawConfig = fs.readFileSync(configPath).toString();
      const config = JSON.parse(rawConfig) as Config;

      if (args.list) {
        const rawNames = Object.keys(config.names)
          .map((key, index) => `${index}. ${key}`)
          .join("\n");
        return console.log(rawNames);
      }

      const { keyDir } = config;
      if (!fs.existsSync(keyDir)) {
        return console.log(
          `${
            keyDir || "`keyDir`"
          } does not exist. Please use \`secret config -p <config_dir>\` at first.`
        );
      }

      if (args.encrypt) {
        const publicKeyPath = path.join(keyDir, KeyNameEnum.PUBLIC);
        if (!fs.existsSync(publicKeyPath)) {
          return console.log(
            `Connot find ${KeyNameEnum.PUBLIC} file in ${keyDir}. Please generate an RSA key pair first and store it in the directory corresponding to \`config.keyDir\``
          );
        }
        const publicKey = fs.readFileSync(publicKeyPath).toString();

        const text = args.e as string;

        const encryptedData = crypto
          .publicEncrypt(
            {
              key: publicKey,
              padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            Buffer.from(text)
          )
          .toString("base64");

        console.log(encryptedData);
      }

      if (args.decrypt) {
        const privateKeyPath = path.join(keyDir, KeyNameEnum.PIRVATE);
        if (!fs.existsSync(privateKeyPath)) {
          return console.log(
            `Connot find ${KeyNameEnum.PIRVATE} file in ${keyDir}. Please generate an RSA key pair first and store it in the directory corresponding to \`config.keyDir\``
          );
        }
        const privateKey = fs.readFileSync(privateKeyPath).toString();

        const text = args.d as string;

        const decryptedData = crypto
          .privateDecrypt(
            {
              key: privateKey,
              padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            Buffer.from(text, "base64")
          )
          .toString();

        if (args.save) {
          const newConfig = merge(config, { names: { [args.save]: text } });
          writeFileSync(configPath, JSON.stringify(newConfig));
          console.log(`\n\`${args.save}\` has saved`);
        }
        console.log(`\n${decryptedData}`);
      }

      if (args.name) {
        const text = config.names[args.name];
        if (!text) {
          return console.log(
            `No record with name \`${args.name}\` was found, please use \`secret -d <encrypt_data>\` instead`
          );
        }

        const privateKeyPath = path.join(keyDir, KeyNameEnum.PIRVATE);
        if (!fs.existsSync(privateKeyPath)) {
          return console.log(
            `Connot find ${KeyNameEnum.PIRVATE} file in ${keyDir}. Please generate an RSA key pair first and store it in the directory corresponding to \`config.keyDir\``
          );
        }

        const privateKey = fs.readFileSync(privateKeyPath).toString();
        const decryptedData = crypto
          .privateDecrypt(
            {
              key: privateKey,
              padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            Buffer.from(text, "base64")
          )
          .toString();

        console.log(`\n${decryptedData}`);
      }
    },
  })
  .version()
  .alias("v", "version")
  .help()
  .alias("h", "help")
  .parse();
