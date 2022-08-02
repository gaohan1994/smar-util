interface IComposeFunction {
  (...args: any[]): any;
}

const pipe =
  (...fns: IComposeFunction[]) =>
  (x) =>
    fns.reduce((res, fn) => fn(res), x);

const compose =
  (...fns: IComposeFunction[]) =>
  (x) =>
    fns.reduceRight((res, fn) => fn(res), x);

export { pipe, compose };
