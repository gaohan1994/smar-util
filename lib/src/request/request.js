"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("./core");
/**
 * @Author: centerm.gaohan
 * @Date: 2021-07-30 11:16:52
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-08-03 17:14:55
 *
 */
var request = function (options) {
    if (options === void 0) { options = {}; }
    var requestCore = new core_1.default(options);
    /**
     * @param requestInstance
     *
     * 再次封装一层，提供requestCore的api
     */
    var requestInstance = function (url, options) {
        return requestCore.request(url, __assign(__assign({}, options), { url: url }));
    };
    /**
     * @method requestInstance.use
     *
     * 中间件设置
     *
     * ```js
     * request.use(middleware);
     * ```
     */
    requestInstance.use = requestCore.use.bind(requestCore);
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
    requestInstance.interceptors = {
        request: {
            use: requestCore.useRequestInterceptorHandler.bind(requestCore)
        },
        response: {
            use: requestCore.useResponseInterceptorHandler.bind(requestCore)
        }
    };
    /**
     * @todo 建立语法糖！
     *
     * @param methods
     *
     * ```js
     * request.post(url, options);
     * request.get(url, options);
     * ```
     */
    var methods = ['get', 'post', 'put', 'delete'];
    methods.forEach(function (method) {
        requestInstance[method] = function (url, options) {
            return requestInstance(url, __assign(__assign({}, options), { method: method }));
        };
    });
    return requestInstance;
};
exports.default = request({});
//# sourceMappingURL=request.js.map