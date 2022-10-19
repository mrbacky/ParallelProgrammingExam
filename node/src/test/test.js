import { getSubIntervals } from "../core/logic.js"
import { expect } from '@jest/globals';

it('returns sub intervals - CASE 1', () => {
  const threads = 4;
  const intervals = [
    { first: 5, last: 9 },
    { first: 10, last: 14 },
    { first: 15, last: 20 },
    { first: 21, last: 26 },
  ]
  const subIntervals = getSubIntervals(5, 26, 4)
  console.log("sub intervals in test: ", subIntervals)
  for (let index = 0; index < threads; index++) {
    expect(subIntervals[index].first).toBe(intervals[index].first);
    expect(subIntervals[index].last).toBe(intervals[index].last);
  }
});

it('returns sub intervals - CASE 2', () => {
  const threads = 7;
  const intervals = [
    { first: 56, last: 71 },
    { first: 72, last: 87 },
    { first: 88, last: 103 },
    { first: 104, last: 119 },
    { first: 120, last: 135 },
    { first: 136, last: 152 },
    { first: 153, last: 169 },
  ]
  const subIntervals = getSubIntervals(56, 169, threads)
  for (let index = 0; index < threads; index++) {
    expect(subIntervals[index].first).toBe(intervals[index].first);
    expect(subIntervals[index].last).toBe(intervals[index].last);
  }
});

it('returns sub intervals - CASE 3', () => {
  const threads = 8;
  const intervals = [
    { first: 56, last: 71 },
    { first: 72, last: 87 },
    { first: 88, last: 103 },
    { first: 104, last: 119 },
    { first: 120, last: 135 },
    { first: 136, last: 152 },
    { first: 153, last: 169 },
    { first: 170, last: 186 },
  ]
  const subIntervals = getSubIntervals(56, 186, threads)
  for (let index = 0; index < threads; index++) {
    expect(subIntervals[index].first).toBe(intervals[index].first);
    expect(subIntervals[index].last).toBe(intervals[index].last);
  }
});

