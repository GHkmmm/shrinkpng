/*
 * @Author: guoming1.huang
 * @Date: 2022-05-19 18:09:24
 * @LastEditors: guoming1.huang
 * @LastEditTime: 2022-06-16 11:27:08
 * @FilePath: /shrinkjs/rollup.config.js
 * @Description: 123
 *
 * Copyright (c) 2022 by tumax_guoming.huang, All Rights Reserved.
 */
import { defineConfig } from "rollup";
import { getBabelOutputPlugin } from "@rollup/plugin-babel";
// rollup处理typescript的插件
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";
import path from "path";
import pkg from "./package.json";
import commonjs from "@rollup/plugin-commonjs";

const resolve = (...args) => path.resolve(...args); // 适应不同环境，封装path.resolve，少写一点代码

export default defineConfig([
  {
    input: "./src/main.ts",
    output: {
      file: pkg.main,
      format: "es",
    },
    plugins: [
      commonjs(), // 处理第三方库的cjs语法
      getBabelOutputPlugin({
        configFile: path.resolve(__dirname, ".babelrc"),
      }),
      typescript({
        sourceMap: false,
      }),
      terser(),
    ],
  },
  {
    // 生成 .d.ts 类型声明文件
    input: resolve("./src/main.ts"),
    output: {
      file: resolve("./", pkg.types),
      format: "es",
    },
    plugins: [dts()],
  },
]);
