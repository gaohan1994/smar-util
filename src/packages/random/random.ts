import { UINT32_SIZE } from "./constants";
import { rankdomEngine } from "./engine";

const random = (min: number, max: number): number => {
  min = Math.floor(min);
  max = Math.floor(max);

  const range = max - min;
  const maximum = range * Math.floor(UINT32_SIZE / range);

  let value = 0;
  do {
    value = rankdomEngine.next() >>> 0;
  } while (value >= maximum);

  return value % range;
};

export { random };
