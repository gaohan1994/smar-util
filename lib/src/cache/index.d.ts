import { ContextResponse } from "types";
/**
 * 请求缓存类
 *
 * @class Cache
 */
declare class Cache {
    /**
     * @member {Map} cache
     *
     * 主缓存对象
     */
    private cache;
    /**
     * @member {number} expirationTime
     *
     * 过期时间
     */
    expirationTime: number;
    /**
     * @member {object} options
     *
     * 参数
     */
    options: any;
    constructor(options: any);
    /**
     * 存放缓存
     *
     * @method set
     * @param {string} key 要存放缓存的key值
     * @param {any} value 要存放的缓存主体
     *
     * @return {void}
     */
    set(key: any, value: any): void;
    /**
     * 获取缓存(根据key)
     *
     * @method get
     * @param {string} key 要获取缓存的key值
     *
     * @return {any}
     */
    get(key: any): ContextResponse;
    /**
     * 删除缓存对象
     *
     * @method delete
     * @param {string} key 要删除的缓存key
     *
     * @return {boolean} 删除是否成功
     */
    delete(key: any): boolean;
    /**
     * 清空缓存
     *
     * @method clear
     * @param null
     *
     * @return {void}
     */
    clear(): void;
    /**
     * 打包要缓存的数据
     *
     * @method pack
     * @param value 要打包的缓存数据
     * @return {packData} 经过打包加工的缓存数据
     */
    pack(value: any): {
        data: any;
    };
    /**
     * 拆包缓存的数据
     */
    unpack(value: any): any;
}
export default Cache;
