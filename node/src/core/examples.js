function promise1() {
    console.log('promise 1 called');
    return new Promise((resolve, reject) => {
        return setTimeout(() => {
            resolve();
            console.log('promise 1 resolved');
        }, 1000);
    });
}

function promise2() {
    console.log('promise 2 called');
    return new Promise((resolve, reject) => {
        return setTimeout(() => {
            resolve();
            console.log('promise 2 resolved');
        }, 1000);
    });
}

export async function sequentialExample() {
    console.time('timer');
    await promise1();
    console.log('-----------------');
    await promise2();
    console.timeEnd('timer');
}



export async function concurentExample() {
    console.time('timer');
    await Promise.all([promise1(), promise2()]);
    console.timeEnd('timer');
}
