"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cache_1 = require("../../cache");
var middleware_1 = require("../middleware");
var fetch_1 = require("../middleware/fetch");
var interceptor_1 = require("../interceptor");
/**
 * @todo request 核心类
 *
 * @class RequestCore
 */
var RequestCore = /** @class */ (function () {
    function RequestCore(options) {
        this.coreMiddleware = new middleware_1.default([fetch_1.default]);
        this.cache = new cache_1.default(options);
        this.options = options;
        this.requestInterceptors = [interceptor_1.addRequestInterceptor];
        this.responseInterceptors = [];
    }
    /**
     * @todo 执行请求拦截器
     *
     * @param {Context} ctx
     * @return {*}  {Promise<any>}
     * @memberof RequestCore
     */
    RequestCore.prototype.executeRequestInterceptors = function (ctx) {
        var _this = this;
        if (this.requestInterceptors.length === 0) {
            return Promise.resolve();
        }
        /**
         * @todo 遍历请求拦截器 并且获得每次执行之后的url 以及options 并赋值
         */
        return new Promise(function (resolve) {
            for (var i = 0; i < _this.requestInterceptors.length; i++) {
                var currentInterceptor = _this.requestInterceptors[i];
                var _a = currentInterceptor(ctx.request.url, ctx.request.options), url = _a.url, options = _a.options;
                ctx.request.url = url || ctx.request.url;
                ctx.request.options = options || ctx.request.options;
                if (i === _this.requestInterceptors.length - 1) {
                    return resolve();
                }
            }
        });
    };
    /**
     * @method use
     * 调用中间件实例，并返回 this 保证链式调用
     *
     * @param {Middleware} middleware
     * @param {anty} option
     * @return {RequestCore}
     * @memberof RequestCore
     */
    RequestCore.prototype.use = function (middleware, option) {
        this.coreMiddleware.use(middleware, option);
        return this;
    };
    /**
     * @todo 添加请求拦截器
     *
     * @param {Function} handler
     * @memberof RequestCore
     */
    RequestCore.prototype.useRequestInterceptorHandler = function (handler) {
        if (typeof handler !== 'function') {
            throw new Error('interceptor must be a function!');
        }
        this.requestInterceptors.push(handler);
    };
    /**
     * @todo 添加响应拦截器
     *
     * @param {ResponseInterceptor} handler
     * @memberof RequestCore
     */
    RequestCore.prototype.useResponseInterceptorHandler = function (handler) {
        if (typeof handler !== 'function') {
            throw new Error('interceptor must be a function!');
        }
        this.responseInterceptors.push(handler);
    };
    /**
     * 请求函数 请求连接必须是 string 类型
     *
     * @param {string} url
     *
     * @param {any} option
     *
     * @memberof RequestCore
     */
    RequestCore.prototype.request = function (url, options) {
        var _this = this;
        if (typeof url !== 'string') {
            throw new Error('url musb be a string!');
        }
        /**
         * @param {CoreParam} ctx
         *
         * 核心请求参数
         */
        var ctx = {
            request: {
                url: url,
                options: options,
            },
            response: undefined,
            cache: this.cache,
            interceptors: this.responseInterceptors
        };
        /**
         * @promise
         *
         * @todo 返回一个 Promise 执行所有中间件并返回请求结果 ctx.response 最后进行错误处理
         */
        return new Promise(function (resolve, reject) {
            _this.executeRequestInterceptors(ctx)
                .then(function () {
                return _this.coreMiddleware.execute(ctx);
            })
                .then(function () {
                resolve(ctx.response);
            })
                .catch(function (error) {
                /**
                 * 如果外部传入 error 处理函数则调用
                 */
                if (ctx.request.options.onError) {
                    try {
                        var errorData = ctx.request.options.onError(error);
                        resolve(errorData);
                    }
                    catch (error) {
                        reject(error);
                    }
                }
                else {
                    reject(error);
                }
            });
        });
    };
    return RequestCore;
}());
exports.default = RequestCore;
