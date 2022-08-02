import { compose, pipe } from "../compose";
import { accountList } from "./data";

describe("Test package compose", () => {
  test("compose without functions should do nothing", () => {
    const composeFunction = compose();
    expect(composeFunction(1)).toEqual(1);
    expect(composeFunction(true)).toEqual(true);
    const data = { name: "Harper Gao" };
    expect(composeFunction(data)).toEqual(data);
  });

  test("compose one function should work", () => {
    const filterAge = (list) => list.filter((account) => account.age < 20);
    const composeFunction = compose(filterAge);
    expect(composeFunction(accountList)).toEqual([
      {
        name: "Jim Want",
        age: 15,
        work: "Software developer",
      },
      {
        name: "Lydia Zhou",
        age: 18,
        work: "Software developer",
      },
    ]);
  });

  test("compose functions should work", () => {
    const filterAge = (list) => list.filter((account) => account.age > 20);
    const filterWork = (list) =>
      list.filter((account) => account.work.indexOf("developer") > -1);
    const composeFunction = compose(filterAge, filterWork);
    expect(composeFunction(accountList)).toEqual([
      {
        name: "Harper Gao",
        age: 28,
        work: "Software developer",
      },
      {
        name: "Nolan Jin",
        age: 99,
        work: "Software developer",
      },
      {
        name: "Kaffi Yang",
        age: 22,
        work: "Team Lead, Software developer",
      },
    ]);
  });
});

describe("Test package pipe", () => {
  test("pipe without functions should do nothing", () => {
    const pipeFunction = pipe();
    expect(pipeFunction(1)).toEqual(1);
    expect(pipeFunction(true)).toEqual(true);
    const data = { name: "Harper Gao" };
    expect(pipeFunction(data)).toEqual(data);
  });

  test("pipe one function should work", () => {
    const filterAge = (list) => list.filter((account) => account.age < 20);
    const pipeFunction = pipe(filterAge);
    expect(pipeFunction(accountList)).toEqual([
      {
        name: "Jim Want",
        age: 15,
        work: "Software developer",
      },
      {
        name: "Lydia Zhou",
        age: 18,
        work: "Software developer",
      },
    ]);
  });

  test("pipe functions should work", () => {
    const filterAge = (list) => list.filter((account) => account.age > 20);
    const filterWork = (list) =>
      list.filter((account) => account.work.indexOf("developer") > -1);
    const pipeFunction = pipe(filterAge, filterWork);
    expect(pipeFunction(accountList)).toEqual([
      {
        name: "Harper Gao",
        age: 28,
        work: "Software developer",
      },
      {
        name: "Nolan Jin",
        age: 99,
        work: "Software developer",
      },
      {
        name: "Kaffi Yang",
        age: 22,
        work: "Team Lead, Software developer",
      },
    ]);
  });
});
