function findSequence(target) {
  let left = 1, right = 2;
  let result = []
  while(left < right) {
    console.log(left, right)
    sum = (left + right) * (right - left + 1) / 2
    if (sum === target) {
      let arr = []
      for (let i = left; i <= right; i++) {
        arr.push(i)
      }
      result.push(arr)
      left++
    } else if (sum < target) {
      right++
    } else {
      left++
    }
  }
  return result
}
const result = findSequence(3);
console.log(result);