import { getPrimesSequential } from './core/logic.js';
import T, { Worker, isMainThread } from 'worker_threads';



// process.env.UV_THREADPOOL_SIZE = 1;
const first = 1;
const last = 10_000_000;
// const worker = new Worker('./src/core/worker.js');
// const numOfThreads = process.env.UV_THREADPOOL_SIZE
// console.log("numOfThreads: ", numOfThreads)
const worker = new Worker('./src/core/worker.js');

// if (isMainThread) {
//     console.log('main');
//     const worker1 = new Worker('./src/core/worker.js', { workerData: { test: "asd" } });
//     const worker2 = new Worker('./src/core/worker.js');
//     // const worker3 = new Worker('./src/core/worker.js');
//     worker1.postMessage("test val 1");
//     worker1.on('message', (data) => {
//       console.log('data1 : ', data);
//     });


//     worker2.postMessage("test val 2");
//     worker2.on('message', (data) => {
//       console.log('data2 : ', data);
//     });

//   } else {


//     console.log('Inside Worker!');
//   }


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
