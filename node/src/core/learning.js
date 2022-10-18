// /**
//  * @param {array} interval array of arrays of numbers [[1,5],[6,10],[11,15]]
//  */
//  export async function getPrimesParallel(first, last) {
//     // make intervals based on current thread count
  
//     // 8 threads
//     // const chunks = os.cpus().length;
//     const chunks = 2;
//     console.log("chunks: ", chunks)
  
//     console.log("f: ", first)
//     console.log("l: ", last)
//     // get full interval lenght
//     const intervalSize = last - first + 1;
//     console.log("intervalLen : ", intervalSize)
  
  
//     const fullIntervalArray = getFullIntervalArray(first, last)
//     console.log("fullIntervalArray: ", fullIntervalArray)
//     // split interval into chunks
  
//     const reminder = intervalSize % chunks
//     if (reminder > 0) {
//       // increase number of items to get zero reminder
      
//     }
//     // define max chunk size
  
//     // const chunkSize = 
  
//     console.log("r: ", r)
  
//     // if (r > 0) {
//     //   console.log("in rem")
//     //   // reminder exists, add reminder to the first or last interval
//     //   for (let i = first; i <= last; i++) {
//     //     console.log("i: ", i)
  
  
//     //     // if (i == 0) {
//     //     //   console.log("i is 0")
//     //     //   // add number of reminder elements 
//     //     // } else {
//     //     //   console.log("with remi - i :", i)
  
//     //     // }
  
//     //   }
//     // } else {
//     //   console.log("else")
//     //   for (let i = first; i <= last; i++) {
//     //     if (i % chunks == 0) {
//     //       console.log("i % chunks == 0: ", i)
//     //     }
//     //   }
//     //   // no reminder, we can split intervals evenly
//     //   // for (let i = 0; i <= chunks; i = + chunks) {
  
//     //   //   console.log("i :", i)
//     //   // }
  
//     // }
  
  
  
  
  
//     // console.log("cores: ", cores)
//     const cpu = os.cpus();
//     return [1, 2]
//     // const p = await compute_primes(1, 1000);
  
//     // return p;
//   }