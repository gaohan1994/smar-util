/**
 * @function isArray
 *
 * @export
 * @param {*} value
 * @return {boolean} value is Array
 */
export function isArray(value): value is Array<any> {
  return (
    typeof value === "object" &&
    Object.prototype.toString.call(value) === "[object Array]"
  );
}

/**
 * @function isObject
 *
 * @export
 * @param {*} value
 * @return {boolean} value is object
 */
export function isObject(value): value is object {
  return value !== null && typeof value === "object";
}

/**
 * @function formatSearchParams
 *
 * @export
 * @param {*} value
 * @return {object} 格式化url参数
 */
export function formatSearchParams(value) {
  /**
   * @param search
   *
   * 浏览器参数
   */
  const search = value || window.location.search;

  /**
   * @param result
   *
   * 格式化之后的浏览器参数
   */
  let result = {};
  if (search === "") {
    return result;
  }

  search
    .replace("?", "")
    .split("&")
    .forEach((item) => {
      result[item.split("=")[0]] = item.split("=")[1];
    });
  return result;
}

/**
 * 请求异常
 *
 * @export
 *
 * @class RequestError
 * @extends {Error}
 */
export class RequestError extends Error {
  public request;
  public type;
  constructor(text, request, type = "RequestError") {
    super(text);
    this.name = "RequestError";
    this.request = request;
    this.type = type;
  }
}

/**
 * 请求超时函数
 *
 * @export
 * @param {*} time
 * @param {*} request
 * @return {*}
 */
export function requestTimeout(time, request) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(
        new RequestError(`Timeout Error ${time}ms !`, request, "RequestTimeout")
      );
    }, time);
  });
}

/**
 * 深拷贝
 *
 * @export
 * @param {*} target
 * @return {*}
 */
export function deepClone<T>(target: T): T {
  // 如果不是对象类型则返回
  if (typeof target !== "object") {
    return;
  }

  let newObj: any = target instanceof Array ? [] : {};

  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      newObj[key] =
        typeof target[key] === "object" ? deepClone(target[key]) : target[key];
    }
  }

  return newObj;
}

/**
 * 快速排序
 * 递归版本
 *
 * @export
 * @param {number[]} array
 * @return {*}  {number[]}
 */
export function quickSort(array: number[]): number[] {
  /**
   * 递归函数
   *
   * @param {*} data 数组
   * @param {*} start
   * @param {*} end
   */
  function position(data, start, end) {
    if (data.length <= 1 || start === end) {
      return;
    }

    let left = start;
    let right = end;

    // 基准值
    let key = data[start];

    // 执行遍历把比基准值大的放右边
    // 把比基准值小的放左边
    // 建立循环当 left > right 时停止
    while (left < right) {
      // 寻找右边比基准值小的数
      while (left < right && key <= data[right]) {
        right--;
      }

      // 寻找左边比基准值大的数
      while (left < right && key >= data[left]) {
        left++;
      }

      // 找到之后交换位置
      const temp = data[left];
      data[left] = data[right];
      data[right] = temp;
    }

    // 遍历完成之后对比基准值和遍历结束时指针指向值的大小
    // 如果基准值大的话 交换位置
    if (left === right && key > data[right]) {
      data[start] = data[right];
      data[right] = key;
    }

    // 继续循环遍历数组的左右两边
    // 如果左边没有排序完成则继续遍历
    if (left - 1 > start) {
      position(array, start, left - 1);
    }

    // 如果右边没有排序完成则继续遍历
    if (right + 1 < end) {
      position(array, right + 1, end);
    }
  }
  position(array, 0, array.length - 1);
  return array;
}

/**
 * 快排栈对象
 * @interface QuitSortStackItem
 */
type QuitSortStackItem = {
  start: number;
  end: number;
};

/**
 * 快速排序非递归方法
 *
 * 相比递归版本 防止爆栈
 *
 * @export
 * @param {number[]} array
 * @return {*}  {number[]}
 */
export function quickSortStack(array: number[]): number[] {
  /**
   * 排序主函数
   *
   * @param {*} data 要排序的数组
   * @param {*} left 开始坐标
   * @param {*} right 结束坐标
   * @return {*}  {number}
   */
  function position(data, start, end): number {
    if (data.length <= 1 || start === end) {
      return -1;
    }
    let left = start;
    let right = end;
    let key = data[start];

    // 循环遍历
    while (left < right) {
      // 找到右边比基准值小的值
      while (left < right && key <= data[right]) {
        right--;
      }
      // 找到左边比基准值大的值
      while (left < right && key >= data[left]) {
        left++;
      }

      // 交换位置
      let temp = data[left];
      data[left] = data[right];
      data[right] = temp;
    }

    // 如果交界位置比基准值小则 交换位置
    if (left === right && key > data[right]) {
      data[start] = data[right];
      data[right] = key;
    }

    // 返回左坐标
    return left;
  }

  // 建立栈
  const stack: QuitSortStackItem[] = [];

  // 建立初始坐标
  let start = 0;
  let end = array.length - 1;

  do {
    if (stack.length != 0) {
      const current = stack.pop();
      start = current.start;
      end = current.end;
    }

    // 获得排序之后的左坐标
    const currentIndex = position(array, start, end);

    // 如果没结束
    if (currentIndex !== -1) {
      // 左边还有数没有排序
      if (currentIndex - 1 > start) {
        stack.push({ start, end: currentIndex - 1 });
      }

      // 如果右边还有数没有排序
      if (currentIndex + 1 < end) {
        stack.push({ start: currentIndex + 1, end });
      }
    }
  } while (stack.length > 0);

  return array;
}

/**
 * 数组去重
 *
 * @export
 * @param {number[]} array
 * @return {number[]}
 */
export function unique(array: number[]): number[] {
  const data = array.filter((item, index, prevArray) => {
    // 判断数组中第一次出现当前数字的坐标是否等于当前坐标
    // 如果不是说明已经有了
    return prevArray.indexOf(item) === index;
  });
  return data;
}

/**
 * 数组扁平化
 *
 * @export
 */
export function flatten<T>(array: Array<T>): Array<T> {
  // 建立栈辅助
  // 初始化时把array传入
  let stack = [...array];

  // 最终扁平化的数据
  let data: Array<T> = [];

  // 遍历
  while (stack.length > 0) {
    // 从栈顶(队尾)弹出元素
    const current = stack.pop();

    if (isArray(current)) {
      // 如果是数组类型则推入栈
      stack.push(...current);
    } else {
      data.push(current);
    }
  }

  // 注意因为是从后往前遍历，所以返回的时候要翻转一下
  return data.reverse();
}

/**
 * 函数防抖
 *
 * @export
 * @param {*} callback
 * @param {*} delay
 * @param {boolean} immediate 是否是立即执行的版本
 */
export function debounce(callback, delay, immediate: boolean) {
  let timer;

  return function () {
    const context = this;
    const args = arguments;

    // 注意 clearTimeout 并不会把timer置null
    if (timer) {
      clearTimeout(timer);
    }

    if (immediate === true) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) {
        callback.apply(context, args);
      }
    } else {
      timer = setTimeout(() => {
        callback.apply(context, args);
      }, delay);
    }
  };
}

interface ThrottleOptions {
  /**
   * 是否禁用第一次执行
   * @param leading
   */
  leading: boolean;
  /**
   * 是否禁用最后一次执行
   * @param trailling
   */
  trailling: boolean;
}
interface Throttle {
  (callback: Function, delay: number, options?: ThrottleOptions): any;
}

/**
 * 节流函数 每n秒内 只执行一次函数
 *
 * @export
 * @param {*} callback
 * @param {*} delay
 */
export function throttle(
  callback,
  delay,
  options = { leading: true, trailling: true }
): Throttle {
  // 时间戳判断
  // 设定一个时间戳，如果当前时间戳 - 之前时间戳，如果 > 传入的周期则 执行函数，否则不执行
  // let prevTimer = 0;

  // return function () {
  //   const context = this;
  //   const args = arguments;
  //   let now = +new Date();

  //   if (now - prevTimer > delay) {
  //     callback.apply(context, args);
  //     prevTimer = now;
  //   }
  // }

  // 定时器版本
  // 设定一个定时器，如果存在定时器，执行完定时器的操作之后清空定时器
  // let prevTimer;
  // return function () {
  //   const context = this;
  //   const args = arguments;

  //   if (!prevTimer) {
  //     prevTimer = setTimeout(() => {
  //       prevTimer = null;
  //       callback.apply(context, args);
  //     }, delay);
  //   }
  // }

  // 两个都有缺陷 时间戳会立即执行 但是最后不会执行
  // 定时器不会立即执行 但是在结束之后还会再执行一次

  let prevTime = 0;
  let timer;

  let context;
  let args;

  const { leading, trailling } = options;

  const later = function () {
    prevTime = +new Date();
    timer = null;
    callback.apply(context, args);
  };

  const throettled = function () {
    context = this;
    args = arguments;

    let now = +new Date();

    if (!prevTime && leading === false) {
      // 如果 prevTime 是空，则是第一次，且 leading = false 禁用第一次触发
      // prevTime = now
      prevTime = now;
    }

    /**
     * 触发下次函数剩余时间
     * @param remaining
     */
    let remaining = delay - (now - prevTime);
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      prevTime = now;
      callback.apply(context, args);
    } else if (!timer && trailling !== false) {
      timer = setTimeout(later, delay);
    }
  };

  return throettled;
}

/**
 * 图片懒加载函数
 *
 * @export
 */
export function initImgLazyLoad() {
  /**
   * 如果非浏览器环境则返回
   */
  if (!document || !window) return;

  /**
   * 拿到全部图片
   */
  let imageList: Array<HTMLImageElement> = [];
  document.querySelectorAll("img").forEach((img) => {
    imageList.push(img);
  });

  const length = imageList.length;

  const imgLazyLoad = (() => {
    let count = 0;

    return function () {
      let alreadyLoadList = [];
      /**
       * 遍历图片
       */
      imageList.forEach((img, i) => {
        let rect = img.getBoundingClientRect();

        if (rect.top < window.innerHeight) {
          img.src = img.dataset.src;
          alreadyLoadList.push(i);
          count++;

          // 如果全部图片加载完毕 移除监听事件
          if (count === length) {
            document.removeEventListener("scroll", imgLazyLoad);
          }
        }
      });

      // 剔除掉已经加载的图片
      imageList = imageList.filter(
        (img, index) => !alreadyLoadList.includes(index)
      );
    };
  })();

  // 这里最好加上防抖
  document.addEventListener("scroll", imgLazyLoad);
}

/**
 * JsonP跨域解决方案
 *
 * @export
 * @param {*} url 请求地址
 * @param {*} [params={}] 请求参数
 * @param {*} callbackName 回调名字
 */
export function jsonP(url, params = {}, callbackName) {
  // 非浏览器环境直接返回
  if (!document || !window) {
    return null;
  }

  function generateUrl() {
    let dataStr = "";

    // 拼接请求参数
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        dataStr += `${key}=${params[key]}&`;
      }
    }

    dataStr += `callback=${callbackName}`;

    return `${url}?${dataStr}`;
  }

  return new Promise((resolve) => {
    const scriptElement = document.createElement("script");
    scriptElement.src = generateUrl();
    document.body.appendChild(scriptElement);

    (window as any)[callbackName] = (data) => {
      resolve(data);
      document.removeChild(scriptElement);
    };
  });
}

/**
 * 安全计算数字
 * 防止精度丢失
 * @param add
 */
export const add = function safeNumberAdd(number1: number, number2: number) {
  /**
   * 数字的精度 如传入 0.1 0.01
   * 则 number1Digits = 1;
   * number2Digits = 2;
   * @param number1Digits
   * @param number2Digits
   */
  const number1Digits = (number1.toString().split(".")[1] || "").length;
  const number2Digits = (number2.toString().split(".")[1] || "").length;

  /**
   * 根据较大的精度生成基础数
   * number1Digits = 1;
   * number2Digits = 2;
   * baseNumber = Math.pow(10, 2) = 100;
   *
   * return (number1 * 100 + number2 * 100) / 100;
   * @param baseNumber
   */
  const baseNumber = Math.pow(10, Math.max(number1Digits, number2Digits));

  return (number1 * baseNumber + number2 * baseNumber) / baseNumber;
};
