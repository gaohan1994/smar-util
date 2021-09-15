const { quickSort, quickSortStack } = require('../dist/index');

function demo() {
  const res = quickSort([49, 38, 65, 97, 76, 13, 27, 49]);
  console.log('res', res);

  const res1 = quickSortStack([49, 38, 65, 97, 76, 13, 27, 49]);
  console.log('res1', res1);
}

demo();
