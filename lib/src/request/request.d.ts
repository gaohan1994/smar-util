declare const _default: {
    (url: any, options: any): Promise<unknown>;
    /**
     * @method requestInstance.use
     *
     * 中间件设置
     *
     * ```js
     * request.use(middleware);
     * ```
     */
    use: any;
    /**
     * @method requestInstance.interceptors
     *
     * 拦截器设置 拆分成 request 和 response
     *
     * ```ts
     * request.interceptors.request.use(handler);
     * request.interceptors.response.use(handler);
     * ```
     */
    interceptors: {
        request: {
            use: any;
        };
        response: {
            use: any;
        };
    };
};
export default _default;
