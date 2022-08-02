import request from "./request/request";
import {
  isArray,
  isObject,
  formatSearchParams,
  deepClone,
  quickSort,
  quickSortStack,
  flatten,
  initImgLazyLoad,
  debounce,
  throttle,
} from "./util/index";
import { EventEmitter } from "./packages/emitter";

export {
  request,
  isArray,
  isObject,
  formatSearchParams,
  deepClone,
  quickSort,
  quickSortStack,
  flatten,
  EventEmitter,
  initImgLazyLoad,
  debounce,
  throttle,
};
