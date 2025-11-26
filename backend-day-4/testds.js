// Task 1: Bubble Sort

// // method implimentation
// const bubbleSort = (arr) => {
//     let n = arr.length;
//     for (let i = 0; i < n; i++) {
//         for (let j = 0; j < n - i - 1; j++) {
//             // here (n-i-1) is to eliminate the comparison of last element
//             //  as it is sorted in previous pass
//             if (arr[j] > arr[j + 1]) {
//                 // do swap of element
//                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//             }
//         }
//     }
//     return arr;
// }

// // driver code
// const arr = [70, 20, 50, 60, 35, 47];
// const result = bubbleSort(arr);
// console.log(`Sorted array : ${result}`);

// // output
// // Sorted array : 20,35,47,50,60,70

// // TimeComplaxity = O(n^2);




// Task 2: Selection Sort

// // method defination
// const selectionSort = (arr) => {
//     let n = arr.length;
//     console.log(`value of n:${n}`);
//     for (let i = 0; i < n; i++){
//         let minIndex = i;
//         // console.log(`value of outer minIndex:${minIndex}`);
//         for (let j = i + 1; j < n; j++){
//             if (arr[j] < arr[minIndex]) {
//                 minIndex = j; //update minIndex to j
//                 // console.log(`value of inner minIndex:${minIndex}`);
//             }
//         }
//         // do swap of element
//         [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
//     }
//     return arr;
// }

// // driver code
// const arr = [70, 20, 50, 60, 35, 47];
// let result = selectionSort(arr);
// console.log(`Sorted array : ${result}`);

// // output
// // value of n:6
// // Sorted array : 20,35,47,50,60,70


// Task : 3 Insertion sort
// // function declaration
// const insertionSort = (arr) => {
//     for (let i = 1; i < arr.length; i++) {
//         let j;
//         let key = arr[i];
//         for (j = i - 1; j >= 0 && arr[j] > key; j--){
//             arr[j + 1] = arr[j];
//         }
//         arr[j + 1] = key;
//     }
//     return arr;

// }

// // driver code
// const arr = [75, 90, 100, 95, 85, 80];
// let result = insertionSort(arr);
// console.log(`Sorted array : ${result}`);
// // output
// // Sorted array : 75,80,85,90,95,100





// task : find min and max using devide and conquer approach

// // function declaration
// const findMaxAndMin = (arr, i, j) => {
//     let max, min;
//     // smaller problems
//     // for 1 element
//     if (i == j) {
//         min = arr[i];
//         max = arr[i];
//         return [min, max];
//     }
//     // for 2 elements
//     else if (i == j - 1) {
//         if (arr[i] < arr[j]) {
//             max = arr[j];
//             min = arr[i];
//             return [min, max];
//         }
//         else {
//             max = arr[i];
//             min = arr[j];
//             return [min, max];
//         }
//     }

//     // for Bigger Problem
//     else {
//         // divide and conquer approach
//         // step 1: divide the problem
//         let mid = i + Math.floor((j - i) / 2);

//         // step 2: conqure - solve each subproblem
//         // two sub-node
//         let min1, max1 = findMaxAndMin(arr, i, mid);
//         let min2, max2 = findMaxAndMin(arr, mid + 1, j);

//         // step 3: combine the solution
//         // final min value
//         if (min1 < min2)
//             min = min1;
//         else
//             min = min2;
//         // final max value
//         if (max1 < max2)
//             max = max2;
//         else
//             max = max1;
//         // return the min max value
//         return [min, max];
//     }
// }


// // driver code
// const arr = [75, 45, 95, 50, 60, 67, 29, 32];
// let i = 0;
// let j = arr.length - 1;
// let result = findMaxAndMin(arr, i, j);
// console.log(`Max and Min value in array is:${result}`);





// task : Find power of element
// time complexity - T(n)= T(n/2) +c
// solve by master theorm = O(n)


// // function definition
// function findPowerOfElement(a, n) {
//     if (n == 1) {
//         return a;
//     }
//     else if (n == 0) {
//         return 1;
//     }
//     else {
//         // divide and conquer approach
//         // 1. divide
//         let mid = Math.floor(n / 2);
//         // 2.conquer
//         let b = findPowerOfElement(a, mid);
//         // 3.combine
//         let result = b * b;
//         if (n % 2 == 0) {
//             return result;
//         } else {
//             return result * result;
//         }
//     }
        
// }

// // driver code
// const a = 2;
// const n = 17;
// let result = findPowerOfElement(a, n);
// console.log(`Power of element is:${result}`);
// // output:
// // Power of element is:65536



// Task : find no of ways for n -Stairs
//  dunction declaration
function findWays(n) {
    if (n == 1) {
        return 1;
    }
    else if (n == 2) {
        return 2;
    }
    else {
        // recurtion happens
        return findWays(n - 1) + findWays(n - 2);
    }
}

// driver code
let n=4;
let result = findWays(n);
console.log(result);