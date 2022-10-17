import { getPrimesSequential } from './core/logic.js';
import T, { Worker, isMainThread } from 'worker_threads';



// process.env.UV_THREADPOOL_SIZE = 1;
const first = 1;
const last = 10_000_000;
// const worker = new Worker('./src/core/worker.js');
// const numOfThreads = process.env.UV_THREADPOOL_SIZE
// console.log("numOfThreads: ", numOfThreads)
const worker = new Worker('./src/core/worker.js');

function func() {
    worker.on('message', (data) => {
        console.log('data : ', data);
    });

    if (isMainThread) {
        // This re-loads the current file inside a Worker instance.
        console.time("main-timer");
        console.log('main');
        console.timeEnd("main-timer");

    } else {
        console.log('Inside Worker!');
        console.log(isMainThread); // Prints 'false'.
    }
}

// func();

// const primes = getPrimesSequential(first, last);
// console.log('primes: ', primes);

// try static 3 arrays with async
const second = 5_000_000;

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








// sequentialExample();
// concurentExample();
// Promise.all([promise1, promise2]).then((values) => {});
