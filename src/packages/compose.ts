import { isArray } from "../util";

interface IComposeFunction {
  (...args: any[]): any;
}

const compose = (...functions: Array<IComposeFunction>) => {
  if (functions.length === 0) {
    return (args: any) => args;
  }

  if (functions.length === 1) {
    return functions[0];
  }

  return functions.reduce(
    (a, b) =>
      (...args: any[]) =>
        a(b(...args))
  );
};

export { compose };
