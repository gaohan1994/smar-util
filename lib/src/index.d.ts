/**
 * @Author: centerm.gaohan
 * @Date: 2021-07-30 11:08:34
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-04 14:42:55
 *
 */
import request from './request/request';
import { isArray, isObject, formatSearchParams } from './util/index';
/**
 * @function request
 *
 * 封装 fetch 请求工具
 */
export default request;
export { isArray, isObject, formatSearchParams };
