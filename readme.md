## Smar Util

### Why

这是 Ghan 封装的常用 javascript 库内含有

- request 封装 fetch 请求
- isArray 判断 Array
- isObject 判断 Object
- formatSearchParams 初始化 query 参数
- deepClone 深拷贝

### 使用

```js
import { request } from 'smar-util';

function requestInterceptor(url, options) {
  return {
    url,
    options,
  };
}

function responseInterceptor(res, options) {
  return res;
}

request.interceptors.request.use(requestInterceptor);
request.interceptors.response.use(responseInterceptor);

request.get(url, options);
request.post(url, options);

function middleware(ctx, next) {
  if (!ctx) {
    return next();
  }

  // ... something
}

request.use(middleware);
```

### 请求函数封装

````ts
declare const _default: {
  (url: any, options: any): Promise<unknown>;
  /**
   * @method requestInstance.use
   *
   * 中间件设置
   *
   * ```js
   * request.use(middleware);
   * ```
   */
  use: any;
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
  interceptors: {
    request: {
      use: any;
    };
    response: {
      use: any;
    };
  };
};
export default _default;
````

### 中间件设置

```ts
/**
 * 中间件类
 *
 * @class CoreMiddleware
 */
declare class CoreMiddleware {
  defaultMiddlewares: any;
  middlewares: any;
  /**
   * @method constructor
   * 构造函数
   *
   * @param {Array[middlewares]} defaultMiddlewares
   * 默认中间件数组
   */
  constructor(defaultMiddlewares: any);
  /**
   * @method use
   * 使用中间件
   *
   * @param {*} newMiddleware
   * @param {*} [options={}]
   * @memberof CoreMiddleware
   */
  use(newMiddleware: any): void;
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
  execute(params?: any): Promise<any>;
}
export default CoreMiddleware;
```
