function level(root) {
  let res = [];
  if (!root) return res;
  let queue = []
  queue.push(root);
  while(queue.length > 0) {
    let tmp = []
    let length = queue.length;
    for(let i = 0; i < length; i++) {
      let node = queue.shift()
      tmp.push[node.val]
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    res = res.concat(tmp)
  }
  return res
}