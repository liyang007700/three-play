function shuffle(arr) {
  let N = arr.length
  for (let i = 0; i < N; i++) {
    let j = i + Math.floor(Math.random() * (N - i))
    let tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }
  return arr
}
console.log(shuffle([1,2,3,4,5]))