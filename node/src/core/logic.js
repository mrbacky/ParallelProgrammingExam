import cluster from 'cluster';
import { Worker, isMainThread } from 'worker_threads';
import os from 'os';
import { exists } from 'fs';

const workerPath = './src/core/worker.js';

/**
 * @param {number} first start of interval
 * @param {number} last end of interval
 * @returns
 */
export async function getPrimesSequential(first, last) {
  const primes = [];
  console.log("----------------------------------")
  console.log(`interval: ${first} - ${last}`);
  for (let i = first; i < last; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  console.log(`interval finished: ${first} - ${last}`);
  console.log("----------------------------------")
  return primes;
}

/**
 * @param {array} intervals array of arrays of numbers [[1,5],[6,10],[11,15]]
 */
export async function getPrimesConcurrent(intervals) {
  const [res1, res2, res3] = await Promise.all([
    getPrimesSequential(intervals[0].first, intervals[0].last),
    getPrimesSequential(intervals[1].first, intervals[1].last),
    getPrimesSequential(intervals[2].first, intervals[2].last),
    getPrimesSequential(intervals[3].first, intervals[3].last),
  ]);
  const primes = [...res1, ...res2, ...res3];
  return primes;
}

function getFullIntervalArray(first, last) {
  const arr = [];
  for (let i = first; i <= last; i++) {
    arr.push(i);
  }
  return arr;
}

/**
 * @param {array} interval array of arrays of numbers [[1,5],[6,10],[11,15]]
 */
export async function getPrimesParallel(intervals) {
  // make intervals based on current thread count
  // 4 threads

  const threadCount = os.cpus().length;
  // const workerResult = await Promise.all()
  let workers = []

  for (let i = 0; i < threadCount; i++) {
    workers.push(initWorker(intervals[i].first, intervals[i].last))
  }
  console.time('parallel time');

  const primes = await Promise.all(workers);
  console.timeEnd('parallel time');

  console.log("primes: ", )
  // const primesLen = primes.length;
  // console.log("primes len: ", primesLen)
  return [1, 2];

}

async function initWorker(first, last) {
  return new Promise((resolve, reject) => {
    let primes = [];
    console.log(`adding worker (${first} => ${last})`);
    const worker = new Worker(workerPath, { workerData: { first, last } });

    worker.on('error', reject);
    worker.on('exit', () => resolve(primes));
    worker.on('message', (msg) => {
      primes = primes.concat(msg);
      console.log('primes: ', primes);
    });
  });
}

function isPrime(num) {
  if (num == 1) return false;
  if (num == 2) return true;

  const limit = Math.ceil(Math.sqrt(num));
  for (let i = 2; i <= limit; i++) {
    if (num % i == 0) return false;
  }
  return true;
}
