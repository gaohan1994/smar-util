import { RequestInterceptorResult } from '../../types'

/**
 * @todo 添加前缀和后缀拦截器
 *
 * @param {*} url
 * @param {*} options
 * @return {*}  {RequestInterceptorResult}
 */
export function addRequestInterceptor(url, options): RequestInterceptorResult {
  const { prefix, suffix } = options;
  if (prefix) {
    url = `${prefix}${url}`;
  }
  if (suffix) {
    url = `${url}${suffix}`;
  }

  return {
    url: url,
    options: options
  };
}