import { setTimeout } from 'timers/promises';
import { parentPort, workerData, isMainThread } from 'worker_threads';
import { getPrimesSequential } from './logic.js';

const promise = getPrimesSequential(workerData.first, workerData.last)

parentPort.postMessage("promise: " + promise);

