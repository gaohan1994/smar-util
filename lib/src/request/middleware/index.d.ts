/**
 * 中间件类
 *
 * @class CoreMiddleware
 */
declare class CoreMiddleware {
    defaultMiddlewares: any;
    middlewares: any;
    /**
     * @method constructor
     * 构造函数
     *
     * @param {Array[middlewares]} defaultMiddlewares
     * 默认中间件数组
     */
    constructor(defaultMiddlewares: any);
    /**
     * @method use
     * 使用中间件
     *
     * @param {*} newMiddleware
     * @param {*} [options={}]
     * @memberof CoreMiddleware
     */
    use(newMiddleware: any): void;
    /**
     * 执行函数
     * 传入请求参数，并传入参数遍历并执行所有中间件函数
     *
     * @param {params} [params=null]
     * 请求参数
     *
     * @return {Function}
     * @memberof CoreMiddleware
     */
    execute(params?: any): Promise<any>;
}
export default CoreMiddleware;
