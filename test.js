// solution 1

// // let nums = [2, 7, 11, 15];
// let nums = [3, 2, 4];
// // let nums = [3, 3];

// const sum = (nums) => {
//   // let target = 9;
//   let target = 6;
//   // let target = 6;
//   const output = [];
//   for (let i = 0; i < nums.length - 1; i++) {
//     for (j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target) {
//         output.push(i, j);
//         console.log(output);
//       }
//     }
//   }
// };

// sum(nums);

// solution 2 =    ======================================

let nums = [1, 1, 2];

const removeDup = (nums) => {
  for (let i = 0; i < nums.length; ) {
    if (nums[i] === nums[i] + 1) {
      nums[i].splice(0, 1);
    } else {
      i++;
    }
  }
};

console.log(removeDup(nums));
