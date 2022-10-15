import express from 'express';
import { sequentialExample, concurentExample } from './core/examples.js';
import { getPrimesSequential } from './core/logic.js';

const server = express();
// sequentialExample
server.get('/se', async (req, res) => {
  await sequentialExample();
  res.status(200).json({ state: "loaded", });
});

// concurentExample
server.get('/ce', async (req, res) => {
  const result = await concurentExample();
  res.status(200).json(result);
});

server.get('/primesSeq', async (req, res) => {
  const primes = await getPrimesSequential(1, 20_000_000);
  res.status(200).json({ primes });
});

server.listen(3000, () => console.log('server running on port 3000'));
