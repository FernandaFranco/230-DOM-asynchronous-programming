function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer(callbacks) {
  callbacks = [].slice.call(arguments);
  var maxSeconds = 2 * callbacks.length;
  var counter = 0;
  var timer = setInterval(function() {
    counter += 1;
    console.log(counter);

    if (counter >= maxSeconds) {
      clearInterval(timer);
    }
  }, 1000);

  callbacks.forEach(function(callback) {
    var pointInTime = Math.floor(Math.random() * (maxSeconds * 1000 + 1));
    setTimeout(callback, pointInTime);
  });
}
randomizer(callback1, callback2, callback3);
// Output:
// 1
// 2
// "callback2"
// "callback3"
// 3
// 4
// 5
// "callback1"
// 6
