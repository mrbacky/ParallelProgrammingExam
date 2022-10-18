import express from 'express';
import { sequentialExample, concurentExample } from './core/examples.js';
import { getPrimesSequential, getPrimesConcurrent, getPrimesParallel } from './core/logic.js';

// process.env.UV_THREADPOOL_SIZE = 2;

const intervals = [
  { first: 1, last: 5_000_000 },
  { first: 5_000_001, last: 10_000_000 },
  { first: 10_000_001, last: 15_000_000 },
  { first: 15_000_001, last: 20_000_000 },
  { first: 20_000_001, last: 25_000_000 },
  { first: 25_000_001, last: 30_000_000 },
  { first: 30_000_001, last: 45_000_000 },
  { first: 45_000_001, last: 50_000_000 },
]

// const intervals = [
//   { first: 1, last: 20_000_000 },
//   { first: 20_000_001, last: 40_000_000 },
// ]

const server = express();
const calls = [];
server.get('/', async (req, res) => {
  calls.push('Called');

  const numOfThreads = process.env.UV_THREADPOOL_SIZE
  const envs = process.env
  console.log("t: ", numOfThreads)

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
  console.time('sequential');
  const primes = await getPrimesSequential(intervals[0].first, intervals[7].last);
  console.timeEnd('sequential');
  const sliced = primes.slice(0, 100);
  res.status(200).json({ sequential: sliced });
});

// NOTE: CONCURRENT
server.get('/primesCon', async (req, res) => {

  console.time('concurrent');

  const primes = await getPrimesConcurrent(intervals);
  console.timeEnd('concurrent');
  const sliced = primes.slice(0, 100);

  res.status(200).json({ concurrent: sliced });
});

// NOTE: PARALLEL

server.get('/primesPar', async (req, res) => {

  // 1 - 20 mil


  // console.time('parallel');
  // console.log("1 process.env.UV_THREADPOOL_SIZE: ", process.env.UV_THREADPOOL_SIZE)

  const primes = await getPrimesParallel(intervals);
  // console.timeEnd('parallel');
  // const sliced = primes.slice(0, 100);
  // console.log("3 process.env.UV_THREADPOOL_SIZE: ", process.env.UV_THREADPOOL_SIZE)

  res.status(200).json({ parallel: "end" });
});



server.listen(3000, () => console.log('server running on port 3000'));
