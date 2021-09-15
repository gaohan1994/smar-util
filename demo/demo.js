const { quickSort, quickSortStack, flatten } = require('../dist/index');

function demo() {
  const res = quickSort([49, 38, 65, 97, 76, 13, 27, 49]);
  // console.log('res', res);

  const res1 = quickSortStack([49, 38, 65, 97, 76, 13, 27, 49]);
  // console.log('res1', res1);

  const flatData = [
    1,
    [2, 3],
    { name: 'asd' },
    [
      {
        name: 'cat',
      },
      {
        name: 'dog',
      },
    ],
  ];
  const result = flatten(flatData);
  console.log('result', result);
}

demo();
