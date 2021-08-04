import RequestCore from './core';

/**
 * @Author: centerm.gaohan
 * @Date: 2021-07-30 11:16:52
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-04 14:10:00
 *
 */

const request = (options = {}) => {
  const requestCore = new RequestCore(options);

  /**
   * @param requestInstance
   * 
   * 再次封装一层，提供requestCore的api
   */
  const requestInstance = (url, options) => {
    return requestCore.request(url, { ...options, url });
  }

  /**
   * @method requestInstance.use
   * 
   * 中间件设置
   * 
   * ```js
   * request.use(middleware);
   * ```
   */
  requestInstance.use = requestCore.use.bind(requestCore);

  /**
   * @method requestInstance.interceptors
   * 
   * 拦截器设置 拆分成 request 和 response
   * 
   * ```ts
   * request.interceptors.request.use(handler);
   * request.interceptors.response.use(handler);
   * ```
   */
  requestInstance.interceptors = {
    request: {
      use: requestCore.useRequestInterceptorHandler.bind(requestCore)
    },
    response: {
      use: requestCore.useResponseInterceptorHandler.bind(requestCore)
    }
  }

  /**
   * @todo 建立语法糖！
   * 
   * @param methods
   * 
   * ```js
   * request.post(url, options);
   * request.get(url, options);
   * ```
   */
  const methods = ['get', 'post', 'put', 'delete'];
  methods.forEach((method) => {
    requestInstance[method] = (url, options) => {
      return requestInstance(url, { ...options, method })
    }
  })

  return requestInstance;
};

export default request({});
