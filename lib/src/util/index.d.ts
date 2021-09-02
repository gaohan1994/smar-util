/**
 * @function isArray
 *
 * @export
 * @param {*} value
 * @return {boolean} value is Array
 */
export declare function isArray(value: any): value is Array<any>;
/**
 * @function isObject
 *
 * @export
 * @param {*} value
 * @return {boolean} value is object
 */
export declare function isObject(value: any): value is object;
/**
 * @function formatSearchParams
 *
 * @export
 * @param {*} value
 * @return {object} 格式化url参数
 */
export declare function formatSearchParams(value: any): {};
/**
 * 请求异常
 *
 * @export
 *
 * @class RequestError
 * @extends {Error}
 */
export declare class RequestError extends Error {
    /**
     *
     * @param {string} request
     *
     * 请求地址
     */
    request: any;
    /**
     * @param {string} type
     *
     * 错误类型默认 RequestError
     */
    type: any;
    /**
     * @param {string} text
     *
     * 报错信息
     */
    constructor(text: any, request: any, type?: string);
}
export declare class ResponseError extends Error {
    /**
     * @param {any} data
     *
     * 响应报错数据
     */
    data: any;
    /**
     * @param {Response} response
     *
     * 响应报文
     */
    response: any;
    /**
     * @param {string} request
     *
     * 请求
     */
    request: any;
    /**
     * @param {string} type
     *
     * 错误类型 默认 ResponseError
     */
    type: any;
    constructor(response: any, text: any, data: any, request: any, type?: string);
}
/**
 * 请求超时函数
 *
 * @export
 * @param {*} time
 * @param {*} request
 * @return {*}
 */
export declare function requestTimeout(time: any, request: any): Promise<unknown>;
/**
 * 深拷贝
 *
 * @export
 * @param {*} target
 * @return {*}
 */
export declare function deepClone(target: any): {};
