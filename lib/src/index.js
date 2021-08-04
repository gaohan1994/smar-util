'use strict';
/**
 * @Author: centerm.gaohan
 * @Date: 2021-07-30 11:08:34
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-04 14:31:28
 *
 */
Object.defineProperty(exports, '__esModule', { value: true });
exports.formatSearchParams = exports.isObject = exports.isArray = void 0;
var request_1 = require('./request/request');
var index_1 = require('./util/index');
Object.defineProperty(exports, 'isArray', {
  enumerable: true,
  get: function () {
    return index_1.isArray;
  },
});
Object.defineProperty(exports, 'isObject', {
  enumerable: true,
  get: function () {
    return index_1.isObject;
  },
});
Object.defineProperty(exports, 'formatSearchParams', {
  enumerable: true,
  get: function () {
    return index_1.formatSearchParams;
  },
});
/**
 * @function request
 *
 * 封装 fetch 请求工具
 */
exports.default = request_1.default;
