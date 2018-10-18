var tracker = (function() {
  var events = [];
  return {
    list: function() {
      return events.slice();
    },
    elements: function() {
      return this.list().map(function(event) {
        return event.target;
      });
    },
    clear: function() {
      events = [];
      return 0;
    },
    add: function(event) {
      events.push(event);
    },
  };
})();
function track(callback) {
  return function(event) {
    if (!event.tracked) {
      tracker.add(event);
      event.tracked = true;
    }

    callback(event);
  }
}

var divRed = document.querySelector('#red');
var divBlue = document.querySelector('#blue');
var divOrange = document.querySelector('#orange');
var divGreen = document.querySelector('#green');

divRed.addEventListener('click', track(function() {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(function() {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(function() {
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(function() {
  document.body.style.background = 'green';
}));
