import RequestCache from '../cache';
import CoreMiddleware from '../middleware';
import fetchMiddleware from '../middleware/fetch';

/**
 * request 核心类
 *
 * @class RequestCore
 */
class RequestCore {
  constructor(options) {
    this.coreMiddleware = new CoreMiddleware([fetchMiddleware]);
    /**
     * @param {RequestCache} cache
     *
     * 创建缓存实例
     */
    this.cache = new RequestCache(options);

    /**
     * @param {options} options
     *
     * 缓存初始化参数
     */
    this.options = options;
  }

  /**
   * 请求函数 请求连接必须是 string 类型
   *
   * @param {string} url
   * @param {any} option
   * @memberof RequestCore
   */
  request(url, options) {
    if (typeof url !== 'string') {
      throw new Error('url musb be a string!');
    }

    /**
     * @param {CoreParam} ctx
     *
     * 核心请求参数
     */
    let ctx = {
      request: {
        url: url,
        options: options,
      },
      response: null,
      cache: this.cache,
    };

    /**
     * @promise
     *
     * 返回一个 Promise
     * 执行所有中间件并返回请求结果 ctx.response
     * 最后进行错误处理
     */
    return new Promise((resolve, reject) => {
      this.coreMiddleware
        .execute(ctx)
        .then(() => {
          resolve(ctx.response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method use
   * 调用中间件实例，并返回 this 保证链式调用
   *
   * @param {Middleware} middleware
   * @param {anty} option
   * @return {RequestCore}
   * @memberof RequestCore
   */
  use(middleware, option) {
    this.coreMiddleware.use(middleware, option);
    return this;
  }
}

export default RequestCore;
