export function getPrimesSequential(first, last) {
  const t = timer();
  const primes = [];
  for (let i = first; i < last; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  console.log(`getPrimesSequential: ${t} ms first: ${first}, last: ${last}`);
  return primes;
}

export async function getPrimesSequentialAsync(first, last) {
  const t = timer();
  const primes = [];
  for (let i = first; i < last; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  console.log(`time: ${t} first: ${first}, last: ${last}`);
  return primes;
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
