import { getSubIntervals } from "../core/logic.js"
import { expect, jest, test } from '@jest/globals';



it('returns sub intervals', () => {


    /**
     *   3   |   4   |  5   |  6   |
     *   7   |   8   |  9   |  10  |
     *   11  |  12   |  13  |
     * 
     * items = 15 - 3 + 1 = 13
     * T = 3
     * 
     * items mod 3 = 
     * 13 mod 3 = 1 
     *  
     * 
     * 
     * 
     */

    const threads = 4;
    const intervals = [
        { first: 5, last: 9 },
        { first: 10, last: 13 },
        { first: 14, last: 17 },
        { first: 18, last: 21 },
    ]

    const subIntervals = getSubIntervals(5, 21, 4)
    for (let index = 0; index < threads; index++) {
        expect(subIntervals[index].first).toBe(intervals[index].first);
        expect(subIntervals[index].last).toBe(intervals[index].last);
    }
});
