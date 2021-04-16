setImmediate(() => {
  console.log('#1');
});
setImmediate(() => {
  console.log('#2');
});
setImmediate(() => {
  console.log('#3');
  setImmediate(() => {
    console.log('#4');
  });
});

setImmediate(() => {
  console.log('immediate');
});

Promise.resolve(1).then(x => {
  console.log(x);
  return x + 1;
}).then(x => {
  console.log(x);
  return x + 1;
}).then(x => console.log(x));