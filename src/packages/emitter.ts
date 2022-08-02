export type EventCBType = (...args: Array<any>) => void;

export type UnsubscribeFunctionType = () => void;

type EventEmitterEventsType = {
  [key: string]: Array<EventCBType>;
};

/**
 * 微信官方的不好用
 * 直接整一个
 *
 * @export
 * @class EventEmitter
 */
class EventEmitter {
  private readonly events: EventEmitterEventsType;

  constructor() {
    this.events = {};
  }

  on(event: string, listener: EventCBType): UnsubscribeFunctionType {
    if (!Array.isArray(this.events[event])) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.removeListener(event, listener);
  }

  removeListener(event: string, cb: EventCBType): void {
    this.events[event] = cb
      ? this.events[event].filter((listener) => listener !== cb)
      : [];
  }

  removeAllListeners(): void {
    Object.keys(this.events).forEach((event) => {
      this.events[event] = [];
    });
  }

  emit(event: string, ...args: Array<any>): void {
    if (Array.isArray(this.events[event])) {
      this.events[event].forEach((listener) => listener.apply(this, args));
    }
  }
}

export { EventEmitter };
