import { CommandModule } from "yargs";

export default {
  command: "config",
  describe: "Config command",
  builder(yargs) {
    return yargs.option("path", {
      alias: "p",
      description: "Set private_key storage location",
      demandOption: true,
      nargs: 1,
      requiresArg: true,
      normalize: true,
      // coerce: (input) => path.resolve(process.cwd(), input),
    });
  },
  handler(args) {
    console.log(args);
  },
} as CommandModule;
