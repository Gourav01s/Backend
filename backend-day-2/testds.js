// Arrays

// // Task 1: Linear Search
// function linearSearch(arr, x) {
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] == x)
//             return i;
//     }
//     return -1;
// }

// arr = [20, 27, 35, 42, 47, 55, 67, 75, 88, 90];
// x = 67;
// result = linearSearch(arr,x);
// console.log("Linear Search :");
// console.log("target is at index:",result);


// // Task 2: Binary Search
// function binarySearch(arr, x, left, right) {
//     while (left <= right) {
//         const mid = left + Math.floor((right - left)/2);
//         console.log(mid);
//         if (arr[mid] == x) {
//             return mid;
//         }
//         else if (arr[mid] < x) {
//             return binarySearch(arr, x, mid + 1, right);
//         }
//         else {
//             return binarySearch(arr, x, left, mid - 1);
//         }
//     }

//     return -1;
// }

// const arr = [20, 27, 35, 42, 47, 55, 67, 75, 88, 90];
// const x = 42;
// const left = 0;
// const right = arr.length;

// const result = binarySearch(arr, x, left, right);
// console.log("Binary Search :");
// console.log("target is at index:", result);
// // output
// // Binary Search :
// // target is at index: 3


// Task 3: exampler Two Pointer Approach
//  given arr is sorted and find a and b where a+b=210
//  TimeComplexity - O(n)

// function findSum(arr, sumValue) {
//     let left = 0;
//     let right = arr.length -1;
    
//     while (left < right) {
//         if (arr[left] + arr[right] == sumValue) {
//             console.log(left,right);
//             return [left, right];
//         }
//         else if (arr[left] + arr[right] > sumValue) {
//             console.log(right);
//             right -= 1;
//         }
//         else {
//             console.log(left);
//             left += 1;
//         }
//     }
//     return [-1,-1];

// }

// const arr = [20, 40, 60, 80, 90, 120, 240];
// const sumValue = 210;
// let result = findSum(arr, sumValue);
// console.log("value at index:", result);

// // output
// // 6    - when left+right > sumValue
// // 0    - from here
// // 1
// // 2        else part repeating
// // 3    - to here
// // 4 5  - if condition executed for match
// // value at index: [ 4, 5 ]


// Task 4: Stock profit buy and sell

// function findMaxProfit(price) {
//     let minPrice = Infinity;
//     let maxProfit = 0;

//     for (let i = 0; i < price.length; i++) {
//         const element = price[i];
//         if (price[i] < minPrice) {
//             // console.log(minPrice, price[i]);
//             minPrice = price[i];
//         }
//         else if (price[i] - minPrice > maxProfit) {
//             maxProfit = price[i] - minPrice;
//             // console.log(maxProfit , price[i] , minPrice);
//         }
        
//     }
//     return maxProfit;
// }

// let price = [7, 1, 5, 3, 6, 4];
// let maxProfit = findMaxProfit(price);
// console.log("max profit of buy and sell will be:", maxProfit);

// // output
// // Infinity 7
// // 7 1
// // 4 5 1
// // 5 6 1
// // max profit of buy and sell will be: 5






// Task -5 search for target in 2D array
// timeComplexity = O(log(m*n))

// // function defination
// const search2DArray = (arr, target) => {
//     // number of rows
//     const m = arr.length;
//     if (m == 0) {
//         return false;
//     }
//     // number of columns
//     const n = arr[0].length;
//     let left = 0, right = m * n - 1;

//     while (left <= right) {
//         const mid = left + Math.floor((right - left) / n);
//         const midElement = arr[Math.floor(mid / n)][mid % n];
//         if (target == midElement) {
//             return true;
//         }
//         else if (target < midElement) {
//             right -= 1;
//         }
//         else {
//             left += 1;
//         }
//     }
//     return false;
// };


 
// // driver code
// const arr = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];
// const target = 3;
// const result = search2DArray(arr, target);
// console.log(result);
// // true


// Task 6 : Ternary Search
// function declaration
const ternarySearch = (arr, i, j, key) => {
    // compute value of mid for ternary search
    let mid1 = i + Math.floor((j - i) / 3);
    let mid2 = j - Math.floor((j - i) / 3);
    console.log(mid1,mid2);

    while (i <= j) {
        if (arr[mid1] == key) {
            return mid1;
        }
        else if (arr[mid2] == key) {
            return mid2;
        }
        else if (key < arr[mid1]) {
            return ternarySearch(arr, i, mid1 - 1, key);
        }
        else if (key > arr[mid2]) {
            return ternarySearch(arr, mid2 + 1, j, key);
        }
        else {
            return ternarySearch(arr, mid1 + 1, mid2 - 1, key);
        }
    }

    return false;
}

// driver code
const arr = [20, 25, 47, 56, 59, 63, 65, 79, 82];
const key = 79;
const i = 0;
const j = arr.length - 1;
const result = ternarySearch(arr, i, j, key);
console.log(result);

// output 
// 2 6 <-- log mid1 mid2
// 7 8 <-- log mid1 mid2
// 7 <-- result 