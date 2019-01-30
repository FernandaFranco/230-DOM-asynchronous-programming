- The DOM: Using Web APIs to work with the DOM
  - the HTML you write is parsed by the browser and turned into the DOM.
  - Use js to update the interface in response to actions triggered by the user or browser;
  - DOM nodes/elements methods and properties:
  ```js
  var p = document.querySelector("p")
  p.nodeName //'P'
  p.tagName //'P'
  p.nodeValue vs p.textContent vs p.innerText
  p.classList
  h1.style.color
  document.getElementById('content')
  document.getElementsByTagName(tagName)
  document.getElementsByClassName(className)
  document.querySelector(selector) // check support for legacy browsers
  ```

- The event model
  - event-driven programming for front-end development
  - capturing and bubbling
    - event gets triggered on an element;
    - during the capturing phase the event 'travels' from the outermost element until it reaches the target element, looking for any listeners for that events attached;
    -  then in the bubbling phase, it 'travels' from the target element until it reaches the outermost element, also looking for any listeners;
    - if `useCapture` is false, the listener will fire in the bubbling phase
    - if true, it will get called in the capture phase;
    - It is interesting to note that adding an event listener of the same type — "click" — to the same element doesn't overwrite the first one that was added.
  - stopping propagation
    - the `event.stopPropagation` method will stop an event from capturing down or bubbling up and firing up all other listeners;
  - event delegation
- Asynchronous Programming
  - Asynchronous code: it doesn't run continuously or even when the runtime encounters it;
  - Ajax: set of techniques used to load data from the server without a browser page refresh.
  - jQuery and the DOM
    - jQuery library: adds to the functionality already provided by the browser
    - selectors
    - event handling
    - DOM manipulation
- Using the XHR object
  - communicating with the server using XHR
  - rendering the response to the page
