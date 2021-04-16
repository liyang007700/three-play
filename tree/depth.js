function depth(root) {
  if (!root) return 0;
  let result = 1
  function maximum(root, depth) {
  if (!root.left && !root.right) {
      result = Math.max(result, depth)
  }
  if (root.left) maximum(root.left, depth + 1)
  if (root.right) maximum(root.right, depth + 1)
  }
  maximum(root, 1)
  return result
}