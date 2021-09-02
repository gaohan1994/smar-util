import { Context } from "types";
/**
 * @todo fetch 中间件
 *
 */
declare function fetchMiddleware(ctx: Context, next: Function): any;
export default fetchMiddleware;
