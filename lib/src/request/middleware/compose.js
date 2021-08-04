"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
/**
 * @function compose
 *
 * @param {Array<middlewares>} middlewares
 *
 * 中间件数组
 *
 * @return
 *
 * 返回组合所有插件的函数
 */
function compose(middlewares) {
    /**
     * 校验 middlewares 格式
     */
    if (!util_1.isArray(middlewares)) {
        throw new Error('middlewares must be an Array!');
    }
    /**
     * 校验 middleware 格式
     */
    for (var i = 0; i < middlewares.length; i++) {
        if (typeof middlewares[i] !== 'function') {
            throw new Error('middleware must be a function!');
        }
    }
    /**
     * @function wrapMiddleware
     *
     * @param {any} params
     * 请求参数传递给每一个middleware
     *
     * @param {function} next
     * 下一个中间件
     */
    return function wrapMiddleware(params, next) {
        var index = -1;
        function dispatch(i) {
            if (index > i) {
                return Promise.reject(new Error('called multiple error!'));
            }
            index = i;
            /**
             * @param {function} currentFunction
             *
             * 当前中间件
             */
            var currentFunction = middlewares[i] || next;
            /**
             * 遍历结束
             */
            if (!currentFunction) {
                return Promise.resolve();
            }
            try {
                /**
                 * 执行当前中间件并插入下一个中间件
                 */
                return Promise.resolve(currentFunction(params, function () { return dispatch(i + 1); }));
            }
            catch (error) {
                return Promise.reject(error);
            }
        }
        return dispatch(0);
    };
}
exports.default = compose;
//# sourceMappingURL=compose.js.map