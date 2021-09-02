/**
 * @function isArray
 *
 * @export
 * @param {*} value
 * @return {boolean} value is Array
 */
export function isArray(value): value is Array<any> {
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
export function isObject(value): value is object {
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
  const search = value || window.location.search;

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
   *
   * @param {string} request
   *
   * 请求地址
   */
  public request;

  /**
   * @param {string} type
   *
   * 错误类型默认 RequestError
   */
  public type;

  /**
   * @param {string} text
   *
   * 报错信息
   */
  constructor(text, request, type = 'RequestError') {
    super(text);

    this.name = 'RequestError';

    this.request = request;

    this.type = type;
  }
}

export class ResponseError extends Error {

  /**
   * @param {any} data
   *
   * 响应报错数据
   */
  public data;

  /**
   * @param {Response} response
   *
   * 响应报文
   */
  public response;

  /**
   * @param {string} request
   *
   * 请求
   */
  public request;

  /**
   * @param {string} type
   *
   * 错误类型 默认 ResponseError
   */
  public type;

  constructor(response, text, data, request, type = 'ResponseError') {
    super(text);
    this.name = 'ResponseError';

    this.data = data;

    this.response = response;

    this.request = request;

    this.type = type;
  }
}

/**
 * 请求超时函数
 *
 * @export
 * @param {*} time
 * @param {*} request
 * @return {*} 
 */
export function requestTimeout(time, request) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new RequestError(`Timeout Error ${time}ms !`, request, 'RequestTimeout'));
    }, time);
  })
}

/**
 * 深拷贝
 *
 * @export
 * @param {*} target
 * @return {*} 
 */
export function deepClone(target) {
  // 如果不是对象类型则返回
  if (typeof target !== 'object') {
    return;
  }

  let newObj = target instanceof Array ? [] : {};

  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      newObj[key] = typeof target[key] === 'object' ? deepClone(target[key]) : target[key];
    }
  }

  return newObj;
}