/**
 * @function isArray
 *
 * @export
 * @param {*} value
 * @return {boolean} value is Array
 */
export function isArray(value) {
  return (
    typeof value === 'object' &&
    Object.prototype.toString.call(value) === '[object Array]'
  );
}

/**
 * @function isObject
 *
 * @export
 * @param {*} value
 * @return {boolean} value is object
 */
export function isObject(value) {
  return value !== null && typeof value === 'object';
}

/**
 * @function formatSearchParams
 *
 * @export
 * @param {*} value
 * @return {object} 格式化url参数
 */
export function formatSearchParams(value) {
  /**
   * @param search
   *
   * 浏览器参数
   */
  const search = value || history.location.search;

  /**
   * @param result
   *
   * 格式化之后的浏览器参数
   */
  let result = {};
  if (search === '') {
    return result;
  }

  search
    .replace('?', '')
    .split('&')
    .forEach((item) => {
      result[item.split('=')[0]] = item.split('=')[1];
    });
  return result;
}

/**
 * 请求异常
 *
 * @export
 *
 * @class RequestError
 * @extends {Error}
 */
export class RequestError extends Error {
  /**
   * @param {string} text
   *
   * 报错信息
   */
  constructor(text, request, type = 'RequestError') {
    super(text);

    this.name = 'RequestError';
    /**
     *
     * @param {string} request
     *
     * 请求地址
     */
    this.request = request;
    /**
     * @param {string} type
     *
     * 错误类型默认 RequestError
     */
    this.type = type;
  }
}

export class ResponseError extends Error {
  constructor(response, text, data, request, type = 'ResponseError') {
    super(text);
    this.name = 'ResponseError';

    /**
     * @param {any} data
     *
     * 响应报错数据
     */
    this.data = data;

    /**
     * @param {Response} response
     *
     * 响应报文
     */
    this.response = response;

    /**
     * @param {string} request
     *
     * 请求
     */
    this.request = request;

    /**
     * @param {string} type
     *
     * 错误类型 默认 ResponseError
     */
    this.type = type;
  }
}
