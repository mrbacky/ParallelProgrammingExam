import express from 'express';
import { sequentialExample, concurentExample } from './core/examples.js';
import {
  getPrimesSequential,
  getPrimesConcurrent,
  getPrimesParallel,
} from './core/logic.js';

const main_first = 1;
const main_last = 2_000_000;

const server = express();
const calls = [];

server.get('/', async (req, res) => {
  calls.push('Called');
  res.status(200).json({ calls });
});

// sequentialExample
server.get('/se', async (req, res) => {
  await sequentialExample();
  res.status(200).json({ state: 'loaded' });
});

// concurentExample
server.get('/ce', async (req, res) => {
  const result = await concurentExample();
  res.status(200).json(result);
});

// NOTE: PRIME REQUESTS

// NOTE: SEQUANTIALS
server.get('/primesSeq', async (req, res) => {
  console.log(`------ Sequential lookup for interval ${main_first} -> ${main_last} -----`)
  console.time('sequential');
  const primes = await getPrimesSequential(main_first, main_last);
  console.timeEnd('sequential');

  const first_prime = primes[0];
  const last_prime = primes[primes.length - 1];

  console.log('first prime: ', first_prime);
  console.log('last prime: ', last_prime);
  console.log('primes lenght: ', primes.length);

  res.status(200).json({ sequential: 'finished' });
  console.log("     ")
});

// NOTE: CONCURRENT
server.get('/primesCon', async (req, res) => {
  console.log(`------ Concurrent lookup for interval ${main_first} -> ${main_last} -----`)
  console.time('concurrent');
  const primes = await getPrimesConcurrent(main_first, main_last);
  console.timeEnd('concurrent');

  const first_prime = primes[0];
  const last_prime = primes[primes.length - 1];

  console.log('first prime: ', first_prime);
  console.log('last prime: ', last_prime);
  console.log('primes lenght: ', primes.length);

  res.status(200).json({ concurrent: 'finised' });
  console.log("     ")
});

// NOTE: PARALLEL
server.get('/primesPar', async (req, res) => {
  console.log(`------ Paralell lookup for interval ${main_first} -> ${main_last} -----`)
  console.time('parallel');
  const primes = await getPrimesParallel(main_first, main_last);
  console.timeEnd('parallel');

  const first_prime = primes[0];
  const last_prime = primes[primes.length - 1];

  console.log('first prime: ', first_prime);
  console.log('last prime: ', last_prime);
  console.log('primes lenght: ', primes.length);

  res.status(200).json({ parallel: 'finished' });
  console.log("     ")
});



server.listen(3000, () => console.log('server running on port 3000'));
