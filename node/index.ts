import { getPrimesSequential } from './core/logic';

const first: number = 1;
const last: number = 10_500_000;

const primes = getPrimesSequential(first, last);
console.log('primes: ', primes);
