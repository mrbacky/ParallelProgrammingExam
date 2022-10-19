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
  console.time('getPrimesSequential');
  console.log('----------------------------------');
  console.log(`START interval: ${first} - ${last}`);
  for (let i = first; i <= last; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  console.log(`END interval: ${first} - ${last}`);
  console.log('----------------------------------');
  console.timeEnd('getPrimesSequential');
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
  let primes = [];
  // const threadCount = os.cpus().length;
  const threadCount = 3; // NOTE: Hardcoded

  // get split of intervals

  // const numberOfChunks = get();
  // const chunkSize = 0;

  // const workerResult = await Promise.all()
  let workers = [];

  for (let i = 0; i < threadCount; i++) {
    workers.push(initWorker(intervals[i].first, intervals[i].last));
  }
  console.log('number of workers: ', workers.length);
  console.time('parallel time');

  await Promise.all(workers).then((res) => {
    primes = primes.concat(res);
  });
  console.timeEnd('parallel time');
  // const primesLen = primes.length;
  // console.log("primes len: ", primesLen)
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
  const I_Count = last - first + 1;
  console.log('I = ', I_Count);

  // Reminder - number of intervals with one extra item then the min size interval
  const bigger_I_Count = I_Count % threads; // 1
  console.log('bigger_I_Count = ', bigger_I_Count);
  const normal_I_Count = threads - bigger_I_Count;
  console.log('normal_I_Count = ', normal_I_Count);

  // min size of one interval
  const base = I_Count - bigger_I_Count;
  const min_I_size = base / threads; // 4
  const max_I_size = min_I_size + 1; // 5
  console.log('base = ', base);
  console.log('min_I_size = ', min_I_size);
  console.log('max_I_size = ', max_I_size);

  const start = first;

  let counter = 0;
  // console.log("f: ", first)
  // console.log("l: ", last)
  let nums = [start];
  let min_I_assignment_counter = 0;
  let max_I_assignment_counter = 0;
  for (let item = first + 1; item <= last; item++) {
    if (min_I_assignment_counter < normal_I_Count) {
      console.log("FOR ITEM: ", item)
      const intervalSkip = min_I_size - 1;
      const last_cand = min_I_size - 2 + item;
      const next_first_cand = last_cand + 1;
      console.log("last_cand", last_cand)
      console.log("next_first_cand", next_first_cand)
      console.log("intervalSkip: ", intervalSkip)
      item = item + intervalSkip

      nums.push(last_cand)
      nums.push(next_first_cand)
      min_I_assignment_counter++;

    } else if (max_I_assignment_counter < bigger_I_Count) {
      console.log("----- bigger interval starting--------")
      console.log("BIGGER INTERVAL FOR ITEM: ", item)
      const intervalSkip = max_I_size - 1;
      const last_cand = max_I_size - 2 + item;
      const next_first_cand = last_cand + 1;
      console.log("last_cand", last_cand)
      console.log("next_first_cand", next_first_cand)
      console.log("intervalSkip: ", intervalSkip)
      item = item + intervalSkip

      nums.push(last_cand)
      if (max_I_assignment_counter < bigger_I_Count - 1) {
        nums.push(next_first_cand)

      }
      max_I_assignment_counter++;

    }

    // item = min_I_size - 1 + item;
    // counter++;
  }

  console.log("nums: ", nums)




  // for (let i = first; i <= last; i++) {
  // for (let col = 0; col <= max_I_size; col++) {
  //   console.log(`${i}  ${col}`)
  // }

  // if (counter <= bigger_I_Count) {
  //   main;
  //   // operations
  // } else {
  //   // operations
  // }
  // counter++;
  // }

  // const intervals = [
  //   { first: 5, last: 9 },
  //   { first: 10, last: 13 },
  //   { first: 14, last: 17 },
  //   { first: 18, last: 21 },
  // ];

  // if r = 1, going one down,  --- one array with extra

  // if r =
  return subIntervals;
}


// if (counter <= bigger_I_Count) {
      //   main;
      //   // operations
      // } else {
      //   // operations
      // }
      // if (row == 4) {
      //   console.log("row == 4")
      //   // break;
      // }
      // if (counter == 4) {
      //   console.log("normal")
      //   break;
      // } else if (counter == 4) {
      //   console.log("one extra")
      //   break;

      // }




       // console.log("start of first col iter ---------------")
    // for (let index = 0; index < array.; index++) {
    //   const element = array[index];

    // }

    // for (let row = 0; row < threads; row++) {
    //   for (let col = 0; col < max_I_size; col++) {
    //     if (row == 0 || col == max_I_size) {
    //       console.log(`row:${row} col: ${col} item: ${item}`);
    //       item++;
    //     }
    //   }

    //   // if (col == 0 || col == 3) {
    //   //   nums.push(item)
    //   // }
    // }
    // console.log("end of first col iter ---------------")
    // console.log(`item outside: ${item}`);
    // console.log("nums: ", nums)


