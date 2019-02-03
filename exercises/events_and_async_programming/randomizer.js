function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

function randomizer() {
  var callbacks = [].slice.call(arguments);
  var length = callbacks.length;
  var i = 0;
  var secs;
  var logger = function() {
    i += 1;
    console.log(i);

    if (i >= 2 * length) {
      clearInterval(interval);
    }
  }

  var interval = setInterval(logger, 1000);

  callbacks.forEach(function(callback) {
    secs = Math.floor(Math.random() * (2 * length)) * 1000;
    setTimeout(callback, secs);
  });
}

randomizer(callback1, callback2, callback3);

