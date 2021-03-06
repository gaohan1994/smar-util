import { isArray } from '../../util';

/**
 * @function compose
 *
 * @param {Array<middlewares>} middlewares
 *
 * 中间件数组
 *
 * @return
 *
 * 返回组合所有插件的函数
 */
function compose(middlewares) {
  /**
   * 校验 middlewares 格式
   */
  if (!isArray(middlewares)) {
    throw new Error('middlewares must be an Array!');
  }

  /**
   * 校验 middleware 格式
   */
  for (let i = 0; i < middlewares.length; i++) {
    if (typeof middlewares[i] !== 'function') {
      throw new Error('middleware must be a function!');
    }
  }

  /**
   * @function wrapMiddleware
   *
   * @param {any} params
   * 请求参数传递给每一个middleware
   *
   * @param {function} next
   * 下一个中间件
   */
  return function wrapMiddleware(params: any, next?: Function) {
    let index = -1;

    function dispatch(i) {
      if (index > i) {
        return Promise.reject(new Error('called multiple error!'));
      }

      index = i;

      /**
       * @param {function} currentFunction
       *
       * 当前中间件
       */
      const currentFunction = middlewares[i] || next;

      /**
       * 遍历结束
       */
      if (!currentFunction) {
        return Promise.resolve();
      }

      try {
        /**
         * 执行当前中间件并插入下一个中间件
         */
        return Promise.resolve(currentFunction(params, () => dispatch(i + 1)));
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return dispatch(0);
  };
}

export default compose;
