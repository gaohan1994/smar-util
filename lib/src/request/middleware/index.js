"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
var compose_1 = require("./compose");
/**
 * 中间件类
 *
 * @class CoreMiddleware
 */
var CoreMiddleware = /** @class */ (function () {
    /**
     * @method constructor
     * 构造函数
     *
     * @param {Array[middlewares]} defaultMiddlewares
     * 默认中间件数组
     */
    function CoreMiddleware(defaultMiddlewares) {
        if (!util_1.isArray(defaultMiddlewares)) {
            throw new Error('middlewares must be an array!');
        }
        /**
         * @param {Array<middlewares>} defaultMiddlewares
         */
        this.defaultMiddlewares = __spreadArray([], defaultMiddlewares);
        /**
         * @param {Array<middlewares>} middlewares
         */
        this.middlewares = [];
    }
    /**
     * @method use
     * 使用中间件
     *
     * @param {*} newMiddleware
     * @param {*} [options={}]
     * @memberof CoreMiddleware
     */
    CoreMiddleware.prototype.use = function (newMiddleware, options) {
        if (options === void 0) { options = {}; }
        if (typeof newMiddleware !== 'function') {
            throw new Error('middleware must be a function!');
        }
        /**
         * 插入中间件中
         */
        this.middlewares.push(newMiddleware);
    };
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
    CoreMiddleware.prototype.execute = function (params) {
        if (params === void 0) { params = null; }
        var composeMiddlewares = compose_1.default(__spreadArray(__spreadArray([], this.middlewares), this.defaultMiddlewares));
        return composeMiddlewares(params);
    };
    return CoreMiddleware;
}());
exports.default = CoreMiddleware;
//# sourceMappingURL=index.js.map