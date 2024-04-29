import typescript from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "es",
  },
  plugins: [
    del({
      targets: "dist/*",
      hook: "buildEnd",
      runOnce: true,
    }),
    typescript({
      include: "src/**/*.ts",
      exclude: "node_modules/**",
      useTsconfigDeclarationDir: false,
      abortOnError: true,
    }),
    terser(),
    json(),
  ],
};
