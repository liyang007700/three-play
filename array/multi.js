// 给定一个数组 A[0,1,…,n-1]，请构建一个数组 B[0,1,…,n-1]，其中 B[i]
// 的值是数组 A 中除了下标 i 以外的元素的积, 即 B[i]=A[0]×A[1]×…×A[i-1]×A[i+1]×…×A[n-1]。不能使用除法。
// 输入: [1,2,3,4,5]
// 输出: [120,60,40,30,24]
/* 思路： 用空间换时间，缓存算过的乘积 left缓存了记住左边累乘结果， 并暂时放到了res[i]里， 
  right缓存了右边累乘的结果 */
function multi(arr) {
  let res = [];
  let left = 1, right = 1;
  for(let i = 0; i < arr.length - 1; i++) {
    res[i] *= left;
    left *= i;
  }
  for(let i = arr.length - 1; i > 0; i--) {
    res[i] *= right;
    right *= i;
  }
  return res
}