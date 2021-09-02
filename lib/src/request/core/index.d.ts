import { Context, RequestInterceptor, ResponseInterceptor } from '../../types';
/**
 * @todo request 核心类
 *
 * @class RequestCore
 */
declare class RequestCore {
    /**
     * @param {CoreMiddleware} coreMiddleware
     *
     * 中间件实例
     */
    coreMiddleware: any;
    /**
     * @param {Cache} cache
     *
     * 创建缓存实例
     */
    cache: any;
    /**
     * 请求拦截器
     * @param requestInterceptors
     *
     * @type {RequestInterceptor[]}
     * @memberof RequestCore
     */
    requestInterceptors: RequestInterceptor[];
    /**
     * 响应拦截器
     * @param responseInterceptors
     *
     * @type {ResponseInterceptor[]}
     * @memberof RequestCore
     */
    responseInterceptors: ResponseInterceptor[];
    /**
     * @param {options} options
     *
     * 缓存初始化参数
     */
    options: any;
    constructor(options: any);
    /**
     * @todo 执行请求拦截器
     *
     * @param {Context} ctx
     * @return {*}  {Promise<any>}
     * @memberof RequestCore
     */
    executeRequestInterceptors(ctx: Context): Promise<any>;
    /**
     * @method use
     * 调用中间件实例，并返回 this 保证链式调用
     *
     * @param {Middleware} middleware
     * @param {anty} option
     * @return {RequestCore}
     * @memberof RequestCore
     */
    use(middleware: any, option: any): this;
    /**
     * @todo 添加请求拦截器
     *
     * @param {Function} handler
     * @memberof RequestCore
     */
    useRequestInterceptorHandler(handler: RequestInterceptor): void;
    /**
     * @todo 添加响应拦截器
     *
     * @param {ResponseInterceptor} handler
     * @memberof RequestCore
     */
    useResponseInterceptorHandler(handler: ResponseInterceptor): void;
    /**
     * 请求函数 请求连接必须是 string 类型
     *
     * @param {string} url
     *
     * @param {any} option
     *
     * @memberof RequestCore
     */
    request(url: string, options: any): Promise<unknown>;
}
export default RequestCore;
