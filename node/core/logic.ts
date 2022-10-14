export function getPrimesSequential(first: number, last: number) {
  const howLong = timer();
  const primes: number[] = [];
  for (let i = first; i < last; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  console.log('time: ', howLong.ms);

  return primes;
}

function isPrime(num: number): boolean {
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
  return {
    /** <integer>s e.g 2s etc. */
    get seconds() {
      const seconds =
        Math.ceil((new Date().getTime() - timeStart) / 1000) + 's';
      return seconds;
    },
    /** Milliseconds e.g. 2000ms etc. */
    get ms() {
      const ms = new Date().getTime() - timeStart + 'ms';
      return ms;
    },
  };
}

// const res = isPrime(23);
// console.log('is Prime? : ', res);
