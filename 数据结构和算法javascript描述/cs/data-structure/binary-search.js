/**
 * simple binary search function
 * @param {*} value 
 * @param {*} arr 
 * @link http://www.nczonline.net/blog/2009/09/01/computer-science-in-javascript-binary-search/
 */
function binarySearch(value, arr) {
  let index = 0
  let start = 0
  let end = arr.length - 1
  let middle = Math.floor((end + start) / 2)

  while(arr[middle] !== value && start < end) {
    if (arr[middle] < value) {
      start = middle + 1
    } else if (arr[middle] > value) {
      end = middle - 1
    }
    middle = Math.floor((end + start) / 2)
  }

  return arr[middle] === value ? middle : -1
}

const arr = [1, 3, 5, 7, 9, 11, 12, 15]

console.log(binarySearch(1, arr))
console.log(binarySearch(15, arr))
console.log(binarySearch(7, arr))
console.log(binarySearch(0, arr))
console.log(binarySearch(17, arr))