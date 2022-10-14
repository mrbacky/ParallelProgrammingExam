import { resolve } from 'path';
import { getPrimesSequential } from './core/logic';
import { getPrimesSequentialAsync } from './core/logic';

const first: number = 1;
const last: number = 10_000_000;

// const primes = getPrimesSequential(first, last);
// console.log('primes: ', primes);

// try static 3 arrays with async
const second: number = 5_000_000;

async function calculate() {
  const [part1, part2] = await Promise.all([
    getPrimesSequentialAsync(first, second),
    getPrimesSequentialAsync(second, last),
  ]);
}

// Promise.all([
//   getPrimesSequentialAsync(first, second),
//   getPrimesSequentialAsync(second, last),
// ]).then(([part1, part2]) => {
//   console.log('part1: ', part1);
//   console.log('part2: ', part2);
// });

// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 1000, 'bar');
// });
// const promise2 = 42;

function promise1() {
  console.log('promise 1 called');

  return new Promise<void>((resolve, reject) => {
    return setTimeout(() => {
      resolve();
      console.log('promise 1 resolved');
    }, 1000);
  });
}

function promise2() {
  console.log('promise 2 called');

  return new Promise<void>((resolve, reject) => {
    return setTimeout(() => {
      resolve();
      console.log('promise 2 resolved');
    }, 1000);
  });
}

async function calc() {
  console.time('timer');

  await promise1();
  console.log('--------');

  await promise2();
  console.timeEnd('timer');
}

calc();

// Promise.all([promise1, promise2]).then((values) => {});
