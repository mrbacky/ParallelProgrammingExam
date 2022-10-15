
import { parentPort } from "worker_threads";

const answer = 42;
parentPort.postMessage(answer);
