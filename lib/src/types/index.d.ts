import Cache from '../cache';
/**
 * @todo 上下文 request 请求类型
 *
 * @interface ContextRequest
 */
export interface ContextRequest {
    url: string;
    options: any;
}
/**
 * @todo 上下文 response 报文类型
 *
 * @param useCache 是否启用 cache
 *
 * @export
 * @interface ContextResponse
 * @extends {Response}
 */
export interface ContextResponse extends Response {
    useCache?: boolean;
}
/**
 * @todo 响应拦截器
 *
 * @param {ContextResponse} response 响应报文
 *
 * @param options 请求参数
 *
 * @export
 * @interface ResponseInterceptor
 */
export interface ResponseInterceptor {
    (response: ContextResponse, options: any): Response;
}
export interface RequestInterceptorResult {
    url?: string;
    options?: any;
}
export interface RequestInterceptor {
    (url: any, options: any): RequestInterceptorResult;
}
/**
 * @todo 上下文类型
 *
 * @param {ContextRequest} request
 *
 * @param {ContextResponse} response
 *
 * @param {Cache} cache
 *
 * @interface Context
 */
export interface Context {
    request: ContextRequest;
    cache: Cache;
    interceptors: Array<ResponseInterceptor>;
    response?: ContextResponse;
}
