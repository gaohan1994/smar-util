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
declare function compose(middlewares: any): (params: any, next?: Function) => Promise<any>;
export default compose;
