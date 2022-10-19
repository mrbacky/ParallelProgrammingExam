import { parentPort, workerData } from 'worker_threads';
import { getPrimesSequential } from './logic.js';

const primes = await getPrimesSequential(workerData.first, workerData.last)

parentPort.postMessage(primes);

