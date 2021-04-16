/*
  输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。
  假设压入栈的所有数字均不相等。例如，序列 {1,2,3,4,5} 是某栈的压栈序列，
  序列 {4,5,3,2,1} 是该压栈序列对应的一个弹出序列，但 {4,3,5,1,2} 就不可能是该压栈序列的弹出序列。
*/

function assistStack1(push, pop) {
  let stack = [], index = 0;
  for (let i = 0; i < push.length; i++) {
    stack.push(push[i])
    while (stack.length > 0 && pop[index] === stack[stack.length - 1]) {
      stack.pop()
      index++
    }
  }
  return stack.length;
}
// console.log(assistStack1([1,2,3,4,5], [4,5,3,2,1]))

/*
  给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
  示例:

  输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
  输出: [3,3,5,5,6,7] 
*/
function assistStack2(nums, k) {
  if(nums.length == 0 || k == 0) {
    return [];
  }
  let queue = [];
  let res = [];
  for(let right = 0, left = 1 - k;
      right < nums.length;
      left++, right++) {
      if(left > 0 && queue[0] == nums[left - 1]) {
          queue.shift();
      }
      while(queue.length != 0 && queue[queue.length - 1] < nums[right]) {
          queue.pop();
      }
      queue.push(nums[right]);
      if(left >= 0) {
          res[left] = queue[0];
      }
  }
  return res;
}