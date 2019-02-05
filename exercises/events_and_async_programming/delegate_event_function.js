// delegate_event_function.js

function delegateEvent(parentElement, selector, eventType, callback) {
  if (parentElement && parentElement instanceof Element) {
    parentElement.addEventListener(eventType, function(event) {
      var elements = parentElement.querySelectorAll(selector);
      elements = [].slice.call(elements);
      if (elements.includes(event.target)) {
        callback(event);
      }
    });
    return true;
  }
}

// Possible elements for use with the scenarios
var element1 = document.querySelector('nav');
var element2 = document.querySelector('main h1');
var element3 = document.querySelector('main');

// Possible callback for use with the scenarios
var callback = function(event) {
  alert('Target: ' + event.target.tagName + '\nCurrent Target: ' + event.currentTarget.tagName);
};

// delegateEvent(element1, 'p', 'click', callback);
delegateEvent(element2, 'p', 'click', callback);
delegateEvent(element2, 'h1', 'click', callback);
delegateEvent(element3, 'h1', 'click', callback);
delegateEvent(element3, 'aside p', 'click', callback);


