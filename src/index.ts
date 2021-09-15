/**
 * @Author: centerm.gaohan
 * @Date: 2021-07-30 11:08:34
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-09-15 16:11:06
 *
 */

import request from './request/request';
import { isArray, isObject, formatSearchParams, deepClone, quickSort, quickSortStack, flatten } from './util/index';

/**
 * @function request
 *
 * 封装 fetch 请求工具
 */

export { request, isArray, isObject, formatSearchParams, deepClone, quickSort, quickSortStack, flatten };
