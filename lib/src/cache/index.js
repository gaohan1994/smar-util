"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 请求缓存类
 *
 * @class Cache
 */
var Cache = /** @class */ (function () {
    function Cache(options) {
        this.cache = new Map();
        this.options = options;
        this.expirationTime =
            options.expirationTime !== undefined
                ? options.expirationTime
                : 1000 * 60 * 60 * 24;
    }
    /**
     * 存放缓存
     *
     * @method set
     * @param {string} key 要存放缓存的key值
     * @param {any} value 要存放的缓存主体
     *
     * @return {void}
     */
    Cache.prototype.set = function (key, value) {
        var cacheKey = JSON.stringify(key);
        this.cache.set(cacheKey, value);
    };
    /**
     * 获取缓存(根据key)
     *
     * @method get
     * @param {string} key 要获取缓存的key值
     *
     * @return {any}
     */
    Cache.prototype.get = function (key) {
        var cacheKey = JSON.stringify(key);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        return undefined;
    };
    /**
     * 删除缓存对象
     *
     * @method delete
     * @param {string} key 要删除的缓存key
     *
     * @return {boolean} 删除是否成功
     */
    Cache.prototype.delete = function (key) {
        var cacheKey = JSON.stringify(key);
        return this.cache.delete(cacheKey);
    };
    /**
     * 清空缓存
     *
     * @method clear
     * @param null
     *
     * @return {void}
     */
    Cache.prototype.clear = function () {
        return this.cache.clear();
    };
    /**
     * 打包要缓存的数据
     *
     * @method pack
     * @param value 要打包的缓存数据
     * @return {packData} 经过打包加工的缓存数据
     */
    Cache.prototype.pack = function (value) {
        return {
            data: value,
        };
    };
    /**
     * 拆包缓存的数据
     */
    Cache.prototype.unpack = function (value) {
        return value.data;
    };
    return Cache;
}());
exports.default = Cache;
//# sourceMappingURL=index.js.map