import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",

  output: {
    file: "dist/index.cjs",
    format: "cjs", // 输出为 CommonJS 格式
  },
  plugins: [
    typescript(), // 使用 TypeScript 插件处理 TypeScript 文件
  ],
};
