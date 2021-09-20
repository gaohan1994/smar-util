/**
 * @Author: centerm.gaohan
 * @Date: 2021-07-30 11:08:34
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-09-20 19:52:00
 *
 */

import request from './request/request';
import {
  isArray,
  isObject,
  formatSearchParams,
  deepClone,
  quickSort,
  quickSortStack,
  flatten,
  initImgLazyLoad,
  debounce,
  throttle,
} from './util/index';
import EventEmitter from './packages/emitter'
/**
 * @function request
 *
 * 封装 fetch 请求工具
 */

export {
  request,
  isArray,
  isObject,
  formatSearchParams,
  deepClone,
  quickSort,
  quickSortStack,
  flatten,
  EventEmitter,
  initImgLazyLoad,
  debounce,
  throttle,
};
