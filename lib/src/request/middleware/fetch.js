"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
/**
 * @todo fetch 中间件
 *
 */
function fetchMiddleware(ctx, next) {
    if (!ctx) {
        return next();
    }
    /**
     * @param {CoreParams} ctx
     *
     * 全局核心参数
     */
    var _a = ctx.request, _b = _a.url, url = _b === void 0 ? '' : _b, _c = _a.options, options = _c === void 0 ? {} : _c, cache = ctx.cache, interceptors = ctx.interceptors;
    /**
     * @param useCache 是否使用cahce 默认 不使用
     * @param method 请求 method 默认 get
     * @param params
     * @param timeout 超时时间 默认 0
     */
    var _d = options.useCache, useCache = _d === void 0 ? false : _d, _e = options.method, method = _e === void 0 ? 'get' : _e, params = options.params, _f = options.timeout, timeout = _f === void 0 ? 0 : _f;
    if (!fetch) {
        throw new Error('fetch not exist!');
    }
    var needCache = useCache;
    /**
     * 如果需要启用了缓存
     */
    if (needCache) {
        /**
         * 尝试从缓存中拿出数据
         *
         * 并把数据的克隆赋值给上下文 ctx.response
         *
         * 成功后返回下一个中间件
         */
        var responseCache = cache.get({ url: url, params: params, method: method });
        if (responseCache) {
            responseCache = responseCache.clone();
            responseCache.useCache = true;
            ctx.response = responseCache;
            return next();
        }
    }
    /**
     * @param {Response} response
     *
     * 如果缓存规则失败则走正常fetch
     */
    var response;
    if (timeout > 0) {
        response = Promise.race([util_1.requestTimeout(timeout, ctx.request), fetch(url, options)]);
    }
    else {
        /**
         * @todo 获得报文
         */
        response = fetch(url, options);
    }
    /**
     * @todo 执行拦截器操作
     *
     * 遍历拦截器传入响应报文并执行拦截器
     */
    interceptors.forEach(function (interceptorHandler) {
        response = response.then(function (res) {
            /**
             * @param resClone 兼容老版本
             */
            var resClone = typeof res.clone === 'function' ? res.clone() : res;
            return interceptorHandler(resClone, options) || res;
        });
    });
    return response.then(function (res) {
        if (needCache) {
            /**
             * 如果需要存入缓存
             *
             * 则把缓存数据存入 cache
             */
            if (res.status === 200) {
                var copy = res.clone();
                copy.useCache = true;
                cache.set({ url: url, params: params, method: method }, copy);
            }
        }
        ctx.response = res;
        return next();
    });
}
exports.default = fetchMiddleware;
