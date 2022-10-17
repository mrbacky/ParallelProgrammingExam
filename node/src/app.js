import express from 'express';
import { sequentialExample, concurentExample } from './core/examples.js';
import { getPrimesSequential, getPrimesConcurrent } from './core/logic.js';

process.env.UV_THREADPOOL_SIZE = 2;

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

server.get('/primesSeq', async (req, res) => {
  console.time('sequential');
  const primes = await getPrimesSequential(1, 15_000_000);
  console.timeEnd('sequential');
  const sliced = primes.slice(0, 100);
  res.status(200).json({ sequential: sliced });
});

// NOTE: CONCURRENT
server.get('/primesCon', async (req, res) => {

  const intervals = [
    [1, 5_000_000],
    [5_000_001, 10_000_000],
    [10_000_001, 15_000_000],
  ]
  console.time('concurrent');

  const primes = await getPrimesConcurrent(intervals);
  console.timeEnd('concurrent');
  const sliced = primes.slice(0, 100);

  res.status(200).json({ concurrent: sliced });
});



server.listen(3000, () => console.log('server running on port 3000'));
