import { Context, ContextResponse } from "types";

/**
 * @todo fetch 中间件
 * 
 */
function fetchMiddleware(ctx: Context, next: Function) {
  if (!ctx) {
    return next();
  }

  /**
   * @param {CoreParams} ctx
   *
   * 全局核心参数
   */
  const {
    request: { url = '', options = {} },
    cache,
    interceptors,
  } = ctx;

  const { useCache = false, method = 'get', params } = options;

  if (!fetch) {
    throw new Error('fetch not exist!');
  }

  const needCache = useCache;

  /**
   * 如果需要启用了缓存
   */
  if (needCache) {

    /**
     * 尝试从缓存中拿出数据
     * 
     * 并把数据的克隆赋值给上下文 ctx.response
     * 
     * 成功后返回下一个中间件
     */
    let responseCache = cache.get({ url, params, method });

    if (responseCache) {
      responseCache = responseCache.clone();
      responseCache.useCache = true;
      ctx.response = responseCache;
      return next();
    }
  }

  /**
   * @param {Response} response
   *  
   * 如果缓存规则失败则走正常fetch
   */
  let response;

  /**
   * @todo 获得报文
   */
  response = fetch(url, options);

  /**
   * @todo 执行拦截器操作
   * 
   * 遍历拦截器传入响应报文并执行拦截器
   */
  console.log('interceptors:', interceptors)
  interceptors.forEach((interceptorHandler) => {
    response = response.then((res) => {

      /**
       * @param resClone 兼容老版本
       */
      const resClone = typeof res.clone === 'function' ? res.clone() : res;
      return interceptorHandler(resClone, options);
    })
  });

  return response.then((res: Response) => {
    if (needCache) {
      /**
       * 如果需要存入缓存
       * 
       * 则把缓存数据存入 cache
       */

      if (res.status === 200) {
        let copy: ContextResponse = res.clone();
        copy.useCache = true;
        cache.set({ url, params, method }, copy);
      }
    }

    ctx.response = res;
    return next();
  });
}

export default fetchMiddleware;
