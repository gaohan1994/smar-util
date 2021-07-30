function fetchMiddleware(ctx, next) {
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
  } = ctx;

  const { useCache = false, method = 'get', params } = options;

  if (!fetch) {
    throw new Error('fetch not exist!');
  }

  const needCache = useCache;

  if (needCache) {
    let responseCache = cache.get({ url, params, method });

    if (responseCache) {
      responseCache.useCache = true;
      ctx.response = responseCache;
      return next();
    }
  }

  /**
   * @param {Response} response
   *
   * 返回报文
   */
  let response;

  response = fetch(url, options);

  return response.then((res) => {
    if (needCache) {
      /**
       * 需要存入缓存
       */

      if (res.status === 200) {
        const copy = res.clone();
        copy.useCache = true;
        cache.set({ url, params, method }, copy);
      }
    }

    ctx.response = response;
    return next();
  });
}

export default fetchMiddleware;
