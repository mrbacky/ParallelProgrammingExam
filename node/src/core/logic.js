export async function getPrimesSequential(first, last) {
  console.log('f: ', first);
  console.log('l: ', last);
  const primes = [];
  for (let i = first; i < last; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

/**
 * Generating Prime numbers concurrently
 * @param {array} intervals array of arrays of numbers [[1,5],[6,10],[11,15]]
 */
export async function getPrimesConcurrent(intervals) {
  const [res1, res2, res3] = await Promise.all([
    getPrimesSequential(intervals[0][0], intervals[0][1]),
    getPrimesSequential(intervals[1][0], intervals[1][1]),
    getPrimesSequential(intervals[2][0], intervals[2][1]),
  ]);

  const primes = [...res1, ...res2, ...res3];
  return primes;
}

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(sliceIntoChunks(arr, 3));

function isPrime(num) {
  if (num == 1) return false;
  if (num == 2) return true;

  const limit = Math.ceil(Math.sqrt(num));
  for (let i = 2; i <= limit; i++) {
    if (num % i == 0) return false;
  }
  return true;
}

/**
 * Simple timer
 */
export function timer() {
  let timeStart = new Date().getTime();
  const ms = new Date().getTime() - timeStart + 'ms';
  return ms;
}

// const res = isPrime(23);
// console.log('is Prime? : ', res);
