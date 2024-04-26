#!/usr/bin/env node
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import path from "path";
// import path from "path";

yargs(hideBin(process.argv)).commandDir(
  // path.join(import.meta.url, "..", "./commands")
  "commands"
);
// const argv = yargs(hideBin(process.argv))
//   .scriptName("secret")
//   .option("path", {
//     alias: "p",
//     description: "Set private_key storage location",
//     demandOption: true,
//     nargs: 1,
//     requiresArg: true,
//     normalize: false,
//     coerce: (input) => path.resolve(process.cwd(), input),
//   })
//   .help()
//   .alias("h", "help")
//   .version()
//   .alias("v", "version").argv as any;

// console.log(argv.path);

// 现在，我想用 yargs 写一个命令行工具，这个工具的参数规则是这样的：`secret -p /foo/bar`，`-p` 必传，后面参数必须是一个路径格式的字符串，也是必传的，请写出实现代码。
// .command(
//   "$0 [path]",
//   "Set private_key resolve path",
//   (yargs) => {
//     yargs.positional("path", {
//       type: "string",
//       description: "Private_key resolve path",
//       normalize: true,
//     });
//     // return yargs.option("position", {
//     //   alias: "p",
//     //   description: "Set private_key storage location",
//     //   nargs: 1,
//     //   boolean: true,
//     //   requiresArg: true,
//     // });
//   },
//   (args) => {
//     console.log(args);
//   }
// )
// .usage(
//   "$0",
//   "Encrypt and decrypt text data using the ECDSA algorithm",
//   (yargs) => {
//     yargs.positional("text", {
//       type: "string",
//       describe: "private_key storage path",
//       normalize: true,
//     });
//     // .command("$0 [path]", "Set private_key storage location", (yargs) => {
//     //         yargs.positional("path", {
//     //           type: "string",
//     //           describe: "private_key storage path",
//     //         });
//     //       })
//     return yargs
//       .option("position", {
//         alias: "p",
//         description: "Set private_key storage location",
//         // nargs: 1,
//         boolean: true,
//         // requiresArg: true,
//       })
//       .option("encrypt", {
//         alias: "e",
//         description: "Encryption",
//         boolean: true,
//       })
//       .option("decrypt", {
//         alias: "d",
//         description: "Decryption",
//         boolean: true,
//       })
//       .option("list", {
//         alias: "l",
//         description: "Show name list",
//         boolean: true,
//       });
//   },
//   (args) => {
//     console.log(args);
//     if (args.position) {
//       if (!args.text) {
//         yargs().showHelp();
//       } else {
//         console.log("private_key updated: ", args.text);
//       }
//     } else if (args.encrypt) {
//       console.log("加密");
//     } else if (args.decrypt) {
//       console.log("解密");
//     } else if (args.list) {
//       console.log("列出列表");
//     } else {
//       yargs().showHelp();
//     }
//   }
// )
