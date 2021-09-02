"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = exports.requestTimeout = exports.ResponseError = exports.RequestError = exports.formatSearchParams = exports.isObject = exports.isArray = void 0;
/**
 * @function isArray
 *
 * @export
 * @param {*} value
 * @return {boolean} value is Array
 */
function isArray(value) {
    return (typeof value === 'object' &&
        Object.prototype.toString.call(value) === '[object Array]');
}
exports.isArray = isArray;
/**
 * @function isObject
 *
 * @export
 * @param {*} value
 * @return {boolean} value is object
 */
function isObject(value) {
    return value !== null && typeof value === 'object';
}
exports.isObject = isObject;
/**
 * @function formatSearchParams
 *
 * @export
 * @param {*} value
 * @return {object} 格式化url参数
 */
function formatSearchParams(value) {
    /**
     * @param search
     *
     * 浏览器参数
     */
    var search = value || window.location.search;
    /**
     * @param result
     *
     * 格式化之后的浏览器参数
     */
    var result = {};
    if (search === '') {
        return result;
    }
    search
        .replace('?', '')
        .split('&')
        .forEach(function (item) {
        result[item.split('=')[0]] = item.split('=')[1];
    });
    return result;
}
exports.formatSearchParams = formatSearchParams;
/**
 * 请求异常
 *
 * @export
 *
 * @class RequestError
 * @extends {Error}
 */
var RequestError = /** @class */ (function (_super) {
    __extends(RequestError, _super);
    /**
     * @param {string} text
     *
     * 报错信息
     */
    function RequestError(text, request, type) {
        if (type === void 0) { type = 'RequestError'; }
        var _this = _super.call(this, text) || this;
        _this.name = 'RequestError';
        _this.request = request;
        _this.type = type;
        return _this;
    }
    return RequestError;
}(Error));
exports.RequestError = RequestError;
var ResponseError = /** @class */ (function (_super) {
    __extends(ResponseError, _super);
    function ResponseError(response, text, data, request, type) {
        if (type === void 0) { type = 'ResponseError'; }
        var _this = _super.call(this, text) || this;
        _this.name = 'ResponseError';
        _this.data = data;
        _this.response = response;
        _this.request = request;
        _this.type = type;
        return _this;
    }
    return ResponseError;
}(Error));
exports.ResponseError = ResponseError;
/**
 * 请求超时函数
 *
 * @export
 * @param {*} time
 * @param {*} request
 * @return {*}
 */
function requestTimeout(time, request) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new RequestError("Timeout Error " + time + "ms !", request, 'RequestTimeout'));
        }, time);
    });
}
exports.requestTimeout = requestTimeout;
/**
 * 深拷贝
 *
 * @export
 * @param {*} target
 * @return {*}
 */
function deepClone(target) {
    // 如果不是对象类型则返回
    if (typeof target !== 'object') {
        return;
    }
    var newObj = target instanceof Array ? [] : {};
    for (var key in target) {
        if (target.hasOwnProperty(key)) {
            newObj[key] = typeof target[key] === 'object' ? deepClone(target[key]) : target[key];
        }
    }
    return newObj;
}
exports.deepClone = deepClone;
