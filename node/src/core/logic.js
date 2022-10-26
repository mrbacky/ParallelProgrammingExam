import { Worker } from 'worker_threads';
import os from 'os';

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

export async function getPrimesConcurrent(first, last) {
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

export async function getPrimesParallel(first, last) {
  // const threadCount = os.cpus().length;
  const threadCount = 4;


  const subIntervals = getSubIntervals(first, last, threadCount);

  let workers = [];

  for (let i = 0; i < threadCount; i++) {
    workers.push(initWorker(subIntervals[i].first, subIntervals[i].last));
  }
  console.log('number of workers: ', workers.length);

  const combinedResults = await Promise.all(workers);
  const primes = combinedResults.flat()
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
      primes = msg;
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

  // number of items in x * x cube
  const base_cube_items_count = number_count - max_size_interval_count;
  const min_I_size = base_cube_items_count / threads;
  const max_I_size = min_I_size + 1;

  // looping through items, got solution from pattern of items that should be added
  /**Example
   * 5,  6,  7,  8
   * 9, 10, 11, 12
   * 13,14, 15, 16, 17   sub intervals of (5,17) for 3 threads should look like this
   */

  // taking a look into pattern
  // (5)  6  7  (8)  (9)  10  11  (12)  (13)  14  15  16  (17) 

  // adding first number by default
  let nums = [first];
  // tracking how many assinments was completed for min and max interval size to decide
  // interval skip change
  let min_I_assignment_counter = 0;
  let max_I_assignment_counter = 0;

  for (let item = first + 1; item <= last; item++) {
    if (min_I_assignment_counter < min_size_interval_count) {
      const interval_skip_size = min_I_size - 1;
      const sub_interval_last = min_I_size - 2 + item;
      const next_sub_interval_first = sub_interval_last + 1;
      item = item + interval_skip_size;
      nums.push(sub_interval_last);
      nums.push(next_sub_interval_first);
      min_I_assignment_counter++;
    } else if (max_I_assignment_counter < max_size_interval_count) {
      const interval_gap_size = max_I_size - 1;
      const sub_interval_last = max_I_size - 2 + item;
      const next_sub_interval_first = sub_interval_last + 1;
      item = item + interval_gap_size;
      nums.push(sub_interval_last);
      // skipping last item, there is no first item, we are closing with last item
      if (max_I_assignment_counter < max_size_interval_count - 1) {
        nums.push(next_sub_interval_first);
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


