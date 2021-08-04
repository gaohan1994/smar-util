import Cache from '../../cache';
import CoreMiddleware from '../middleware';
import fetchMiddleware from '../middleware/fetch';
import { Context, RequestInterceptor, ResponseInterceptor, RequestInterceptorResult } from '../../types';
import { addRequestInterceptor } from '../interceptor'

/**
 * @todo request 核心类
 *
 * @class RequestCore
 */
class RequestCore {

  /**
   * @param {CoreMiddleware} coreMiddleware 
   * 
   * 中间件实例
   */
  public coreMiddleware;

  /**
   * @param {Cache} cache
   *
   * 创建缓存实例
   */
  public cache;

  /**
   * 请求拦截器
   * @param requestInterceptors
   *
   * @type {RequestInterceptor[]}
   * @memberof RequestCore
   */
  public requestInterceptors: RequestInterceptor[];

  /**
   * 响应拦截器
   * @param responseInterceptors
   *
   * @type {ResponseInterceptor[]}
   * @memberof RequestCore
   */
  public responseInterceptors: ResponseInterceptor[];

  /**
   * @param {options} options
   *
   * 缓存初始化参数
   */
  options;

  constructor(options) {
    this.coreMiddleware = new CoreMiddleware([fetchMiddleware]);

    this.cache = new Cache(options);

    this.options = options;

    this.requestInterceptors = [addRequestInterceptor];

    this.responseInterceptors = [];
  }

  /**
   * @todo 执行请求拦截器
   *
   * @param {Context} ctx
   * @return {*}  {Promise<any>}
   * @memberof RequestCore
   */
  public executeRequestInterceptors(ctx: Context): Promise<any> {
    if (this.requestInterceptors.length === 0) {
      return Promise.resolve();
    }

    /**
     * @todo 遍历请求拦截器 并且获得每次执行之后的url 以及options 并赋值
     */
    return new Promise((resolve) => {
      for (let i = 0; i < this.requestInterceptors.length; i++) {
        const currentInterceptor = this.requestInterceptors[i];
        const { url, options } = currentInterceptor(ctx.request.url, ctx.request.options);

        console.log('currentInterceptor url', url);

        ctx.request.url = url || ctx.request.url;
        ctx.request.options = options || ctx.request.options;

        if (i === this.requestInterceptors.length - 1) {
          return resolve();
        }
      }
    });
  }

  /**
   * 请求函数 请求连接必须是 string 类型
   *
   * @param {string} url
   * 
   * @param {any} option
   * 
   * @memberof RequestCore
   */
  public request(url: string, options) {
    if (typeof url !== 'string') {
      throw new Error('url musb be a string!');
    }

    /**
     * @param {CoreParam} ctx
     *
     * 核心请求参数
     */
    let ctx: Context = {
      request: {
        url: url,
        options: options,
      },
      response: undefined,
      cache: this.cache,
      interceptors: this.responseInterceptors
    };

    /**
     * @promise
     *
     * 返回一个 Promise
     * 
     * 执行所有中间件并返回请求结果 ctx.response
     * 
     * 最后进行错误处理
     */
    return new Promise((resolve, reject) => {
      this.executeRequestInterceptors(ctx)
        .then(() => {
          console.log('ctx: ', ctx);
          return this.coreMiddleware.execute(ctx)
        })
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
  public use(middleware, option) {
    this.coreMiddleware.use(middleware, option);
    return this;
  }

  /**
   * @todo 添加请求拦截器
   *
   * @param {Function} handler
   * @memberof RequestCore
   */
  public useRequestInterceptorHandler(handler: RequestInterceptor) {
    if (typeof handler !== 'function') {
      throw new Error('interceptor must be a function!');
    }

    this.requestInterceptors.push(handler);
  }

  /**
   * @todo 添加响应拦截器
   *
   * @param {ResponseInterceptor} handler
   * @memberof RequestCore
   */
  public useResponseInterceptorHandler(handler: ResponseInterceptor) {
    if (typeof handler !== 'function') {
      throw new Error('interceptor must be a function!');
    }

    this.responseInterceptors.push(handler);
  }
}

export default RequestCore;
