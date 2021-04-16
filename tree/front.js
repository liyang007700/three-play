class TreeNode {
  constructor (val, left, right) {
      this.val = val === undefined ? 0 : val
      this.left = left === undefined ? null : left
      this.right = right === undefined ? null : right
  }
}
/**
* @param {TreeNode} root
* @return {number[]}
*/
var preorderTraversal = function(root) {
  const answer = []
  const traversal = (node, arr) => {
      // 递归三要求：入参、返回值、递归退出条件、递归逻辑
      if (!node) return
      arr.push(node.val)
      traversal(node.left, answer)
      traversal(node.right, answer)
  }
  traversal(root, answer)
  return answer
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var preorderTraversal = function(root) {
  const answer = []
  const stack = []
  if (!root) {
    return answer
  }
  stack.push(root)
  while (stack.length) {
    const cur = stack.pop()
    answer.push(cur.val)
    // 依次推入右边、左边节点
    // 为什么先推入右因为我们使用的是pop、
    if (cur.right) stack.push(cur.right)
    if (cur.left) stack.push(cur.left)
  }
  return answer
};