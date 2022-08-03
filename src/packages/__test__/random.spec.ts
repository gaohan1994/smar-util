import { UINT32_SIZE } from "../random/constants";
import { rankdomEngine } from "../random/engine";
import { random } from "../random";

describe("test rankdomEngine module", () => {
  it("should generate 128 count int32array", () => {
    const spy = jest.spyOn(Math, "random");
    rankdomEngine.next();
    expect(spy).toHaveBeenCalled();

    const int32Value = rankdomEngine.next();
    expect(int32Value < UINT32_SIZE).toBe(true);
  });
});

describe("test random module", () => {
  const generateRandomArray = (): Array<number> => {
    const result = [];
    for (let i = 0; i < 10000; i++) {
      result.push(random(0, 100));
    }
    return result;
  };

  const generateRandomAreaArray = (
    randomArray: Array<number>
  ): Array<Array<number>> => {
    const result = [];
    [
      [0, 10],
      [10, 20],
      [20, 30],
      [30, 40],
      [40, 50],
      [50, 60],
      [60, 70],
      [70, 80],
      [80, 90],
      [90, 100],
    ].map((area, areaIndex) => {
      for (let i = 0; i < randomArray.length; i++) {
        const [areaLeft, aredRight] = area;
        const randomNumber = randomArray[i];
        if (randomNumber >= areaLeft && randomNumber < aredRight) {
          if (result[areaIndex]) {
            result[areaIndex].push(randomNumber);
          } else {
            result[areaIndex] = [randomNumber];
          }
        }
      }
    });
    return result;
  };

  const printRandomNumberArea = (randomAreaArray: Array<Array<number>>) => {
    let result = "";
    for (let i = 0; i < randomAreaArray.length; i++) {
      result += `区间: ${i + 1}, 区间生成随机数数量: ${
        randomAreaArray[i].length
      } \n`;
    }
    console.log(result);
  };

  it("test random array", () => {
    const randomArray = generateRandomArray();
    const randomAreaResult = generateRandomAreaArray(randomArray);
    printRandomNumberArea(randomAreaResult);
  });
});
