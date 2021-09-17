/**
 * 实现一个 EventEmitter
 * @Author: centerm.gaohan 
 * @Date: 2021-09-17 13:36:35 
 * @Last Modified by: centerm.gaohan
 * @Last Modified time: 2021-09-17 14:00:18
 */

type EventTask = any;

class EventEmitter {

  private tasks: Map<string | number, EventTask[]>;

  constructor() {
    this.tasks = new Map();
  }

  /**
   * 订阅
   *
   * @param {*} taskName
   * @param {*} task
   * @memberof EventEmitter
   */
  on(taskName, task) {
    if (this.tasks.has(taskName)) {
      // 如果已经注册这个任务了，则
      let callbacks = this.tasks.get(taskName);
      callbacks.push(task);
      this.tasks.set(taskName, callbacks);
    } else {
      // 如果没注册过 则注册
      this.tasks.set(taskName, [task]);
    }
  }

  /**
   * 取消订阅
   *
   * @param {*} taskName
   * @param {*} task
   * @memberof EventEmitter
   */
  off(taskName, task) {
    const currentTask = this.tasks.get(taskName);

    if (currentTask) {
      const index = currentTask.findIndex(f => (f === task || f.callback === task));
      if (index > 0) {
        currentTask.splice(index, 1);
      }
    }
  }

  /**
   * 触发
   *
   * @param {*} taskName
   * @param {*} restArguments
   * @memberof EventEmitter
   */
  emit(taskName, ...restArguments) {
    const currentTask = this.tasks.get(taskName);

    if (currentTask) {
      // 拷贝
      let currentTaskCallbacks = currentTask.slice();

      for (let callback of currentTaskCallbacks) {
        // 遍历注册的事件，循环调用，参数传递进去
        callback(...restArguments);
      }
    }
  }

  /**
   * 只执行一次就销毁
   *
   * @param {*} taskName
   * @param {*} restArguments
   * @memberof EventEmitter
   */
  once(taskName, ...restArguments) {
    const currentTask = this.tasks.get(taskName);

    if (currentTask) {
      // 拷贝
      let currentTaskCallbacks = currentTask.slice();

      for (let callback of currentTaskCallbacks) {
        // 遍历注册的事件，循环调用，参数传递进去
        callback(...restArguments);
      }

      // 销毁
      this.tasks.delete(taskName);
    }
  }
}

export default EventEmitter;