const path = require('path');
const rollupResolvePlugin = require('rollup-plugin-node-resolve');
const rollupBuiltinsPlugin = require('rollup-plugin-node-builtins');
// const rollupBabel = require('rollup-plugin-babel');
const rollupCommonJsPlugin = require('rollup-plugin-commonjs');
const rollupTypescriptPlugin = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');

function getPath(pathName) {
  return path.resolve(__dirname, pathName);
}

module.exports = {
  /**
   * 入口文件
   * @param input
   */
  input: getPath('../src/index.ts'),

  /**
   * 输出文件
   * @param output
   */
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'smar-util',
    },
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'smar-util',
      plugins: [terser()],
    },
    {
      file: 'dist/index.cjs.js',
      format: 'commonjs',
      name: 'smar-util',
    },
    {
      file: 'dist/index.min.cjs.js',
      format: 'commonjs',
      name: 'smar-util',
      plugins: [terser()],
    },
  ],

  /**
   * 插件列表
   * @param plugins
   */
  plugins: [
    /**
     * rollup 解析代码中依赖的 node_modules
     * @param rollupResolvePlugin
     */
    rollupResolvePlugin({
      extensions: ['.js', '.ts'],
      // preferBuiltins: false,
      browser: true,
    }),

    rollupBuiltinsPlugin(),

    /**
     * rollup 解析 commonjs 语法的 import export
     * @param rollupCommonJsPlugin
     */
    rollupCommonJsPlugin({
      // extensions: ['.js', '.ts'],
      // preferBuiltins: false,
      // preferBuiltins: false,
    }),
    /**
     * rollup编译解析ts插件
     *
     * @param rollupTypescriptPlugin
     */
    rollupTypescriptPlugin({
      tsconfig: getPath('../tsconfig.json'),
      extensions: ['.js', '.ts'],
    }),

    // rollupBabel({
    //   exclude: 'node_modules/**',
    // }),
  ],
};
