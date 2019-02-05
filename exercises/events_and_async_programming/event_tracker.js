const tracker = (() => {
  const events = [];
  return {
    list() {
      return events.slice();
    },
    elements() {
      return events.map(event => event.target);
    },
    add(event) {
      events.push(event);
    },
    clear() {
      events = [];
      return events.length;
    },
  };
})();

function track(callback) {
  return function(e) {
    if (!e.tracked) {
      tracker.add(e);
      e.tracked = true;
    }
    callback(e);
  };
}

const divRed = document.querySelector('div#red');
const divBlue = document.querySelector('div#blue');
const divOrange = document.querySelector('div#orange');
const divGreen = document.querySelector('div#green');

divRed.addEventListener('click', track(event => {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
  document.body.style.background = 'green';
}));
