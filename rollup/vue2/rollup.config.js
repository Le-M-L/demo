import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";

export default {
  input: "src/index.js",
  output: {
    file: "dist/umd/vue.js", // rollup支持的多种输出格式(有amd,cjs, es, iife 和 umd)
    name: "Vue", // 指定打包后的全局变量名
    format: "umd", // 统一打包规范
    soucemap: true, // es6 => es5 开启源码调试
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    process.env.ENV === "development"
      ? serve({
          open: true,
          openPage: "/public/index.html",
          port: 9000,
          contentBase: "", //
        })
      : "",
  ],
};
