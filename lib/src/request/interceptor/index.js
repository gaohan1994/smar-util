"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequestInterceptor = void 0;
/**
 * @todo 添加前缀和后缀拦截器
 *
 * @param {*} url
 * @param {*} options
 * @return {*}  {RequestInterceptorResult}
 */
function addRequestInterceptor(url, options) {
    var prefix = options.prefix, suffix = options.suffix;
    if (prefix) {
        url = "" + prefix + url;
    }
    if (suffix) {
        url = "" + url + suffix;
    }
    console.log('url', url);
    console.log('options', options);
    return {
        url: url,
        options: options
    };
}
exports.addRequestInterceptor = addRequestInterceptor;
//# sourceMappingURL=index.js.map