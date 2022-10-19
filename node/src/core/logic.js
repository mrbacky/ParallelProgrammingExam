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
  for (let i = first; i <= last; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

/**
 * @param {array} intervals array of arrays of numbers [[1,5],[6,10],[11,15]]
 */
export async function getPrimesConcurrent(first, last) {
  // hardcoded value for testing
  const threadCount = os.cpus().length;
  const subIntervals = getSubIntervals(first, last, threadCount)
  const promises = [];
  for (let index = 0; index < threadCount; index++) {
    promises.push(getPrimesSequential(subIntervals[index].first, subIntervals[index].last))
  }

  const results = await Promise.all(promises);
  const primes = results.flat();
  return primes;
}

/**
 * @param {array} interval array of arrays of numbers [[1,5],[6,10],[11,15]]
 */
export async function getPrimesParallel(first, last) {
  const threadCount = os.cpus().length;

  // get split of intervals
  const subIntervals = getSubIntervals(first, last, threadCount);

  let workers = [];

  for (let i = 0; i < threadCount; i++) {
    workers.push(initWorker(subIntervals[i].first, subIntervals[i].last));
  }
  console.log('number of workers: ', workers.length);
  console.time('parallel time');

  const combinedResults = await Promise.all(workers);
  const primes = combinedResults.flat()
  console.timeEnd('parallel time');
  return primes;
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

export function getSubIntervals(first, last, threads) {
  let subIntervals = [];

  // number of items
  const number_count = last - first + 1;

  // number of intervals with one extra item then the min size interval
  const max_size_interval_count = number_count % threads;
  const min_size_interval_count = threads - max_size_interval_count;

  const base = number_count - max_size_interval_count;
  const min_I_size = base / threads;
  const max_I_size = min_I_size + 1;


  // looping through items, got solution from pattern of items that should be added
  /**Example
   * 5,  6,  7,  8
   * 9, 10, 11, 12
   * 13,14, 15, 16, 17   sub intervals of (5,17) for 3 threads should look like this
   */

  // finding pattern

  // (5)  6  7  (8)  (9)  10  11  (12)  (13)  14  15  16  (17) 

  // adding first number by default
  let nums = [first];
  // tracking how many assinments was completed for min and max interval size to decide
  // interval skip change
  let min_I_assignment_counter = 0;
  let max_I_assignment_counter = 0;

  for (let item = first + 1; item <= last; item++) {
    if (min_I_assignment_counter < min_size_interval_count) {
      const intervalSkip = min_I_size - 1;
      const last_cand = min_I_size - 2 + item;
      const next_first_cand = last_cand + 1;
      item = item + intervalSkip;
      nums.push(last_cand);
      nums.push(next_first_cand);
      min_I_assignment_counter++;
    } else if (max_I_assignment_counter < max_size_interval_count) {
      const intervalSkip = max_I_size - 1;
      const last_cand = max_I_size - 2 + item;
      const next_first_cand = last_cand + 1;
      item = item + intervalSkip;
      nums.push(last_cand);
      // skipping last item. There is no first candidate, we are closing with last item
      if (max_I_assignment_counter < max_size_interval_count - 1) {
        nums.push(next_first_cand);
      }
      max_I_assignment_counter++;
    }
  }

  // build array of intervals
  for (let index = 0; index < nums.length; index++) {
    const first = nums[index];
    const last = nums[index + 1];
    subIntervals.push({ first: first, last: last });
    index++;
  }
  return subIntervals;
}


