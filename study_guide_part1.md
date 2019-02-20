- The DOM: Using Web APIs to work with the DOM
  - the HTML you write is parsed by the browser and turned into the DOM.
  - Use js to update the interface in response to actions triggered by the user or browser;
  - DOM nodes/elements methods and properties:
  ```js
  var p = document.querySelector("p")
  var elements = document.querySelectorAll(selector) // NodeList that we can converto to array
  p.contains // boolean, including caller element
  p.nodeName //'P'
  p.tagName //'P'
  p.nodeValue vs p.textContent vs p.innerTextxx
  p.classList
  h1.style.color
  document.getElementById('content')
  document.getElementsByTagName(tagName)
  document.getElementsByClassName(className)
  document.querySelector(selector) // check support for legacy browsers
  ```

- The event model
  - event-driven programming for front-end development
  - `event.key` might not be supported by Microsoft and Safari browsers. Use `event.which` instead, but it is a deprecated property and might not be supported by browsers in the future;
  - capturing and bubbling
    - event gets triggered on an element;
    - during the capturing phase the event 'travels' from the outermost element until it reaches the target element, looking for any listeners for that events attached;
    -  then in the bubbling phase, it 'travels' from the target element until it reaches the outermost element, also looking for any listeners;
    - if `useCapture` is false, the listener will fire in the bubbling phase
    - if true, it will get called in the capture phase;
    - `useCapture` determines whether the event handler gets called during the bubbling or capturing phase. Regardless of its value, the event goes through both phases.
    - It is interesting to note that adding an event listener of the same type — "click" — to the same element doesn't overwrite the first one that was added.
  - stopping propagation
    - the `event.stopPropagation` method will stop an event from capturing down or bubbling up and firing up all other listeners;
    - prevents subsequent listeners from firing;
  - event delegation
  - event loop
    - v8 is the runtime inside Chrome
    - web apis: extra things the browser provides: DOM, XMLHttpRequest, setTimeout
    - event loop: defers the execution of async callback functions until the stack is clear

- Asynchronous Programming
  - Asynchronous code: it doesn't run continuously or even when the runtime encounters it;
  - Ajax: Asynchronous JavaScript And XML
    - set of techniques used to load data from the server without a browser page refresh.
    - fetch data, typically HTML or XML, and update parts of a page.
  - jQuery and the DOM
    - jQuery library: adds to the functionality already provided by the browser
    - width() and height() return and use numeric values, not string values like css() does;
    -  jQuery also accepts camel case property names instead. Whenever you have a CSS property that includes one or more hyphens, you can omit the hyphens and capitalize the next letter instead. For font-size, for example, you can use fontSize instead
    - jQuery methods:
    ```js
      css()
      filter()
      find()
      attr()
      each()
      eq(index) // gives jQuery object back, instead of DOM element
      hide()
      show() // restores display to previous value
      val()
      prop() // when dealing with select and checkboxes, use prop instead of attr
      attr()
      parent()
      parents()
      closest()
      text()
      addClass
      on(eventType, callback)
      off
      click
      submit
      trigger(eventType)
      get() // w/o args returns array of DOM objects. accepts negative values
      prependTo()
      before()
      insertBefore()
      $(window).scrollTop()
      fadeIn()
      fadeOut()
      stop()
    ```
    - selectors
      - jQuery specific selectors:
      ```js
        :checked
        :visible
        :hidden
        :text
        :submit
        :contains('ac ante')
        :not(".protected")
      ```
    - event handling
      - jQuery allows chaining of methods, incluiding event binding
    - DOM manipulation

- Using the XHR object
  - `XMLHttpRequest` is one of the browser APIs that provide network programming functionality to JavaScript applications. Libraries or utility functions often wrap this web API.
  - The name comes from its original use, which was to fetch XML documents over HTTP. Today, we use this object to load any data (typically HTML or JSON)
  - communicating with the server using XHR
    ```js
      var request = new XMLHttpRequest();
      request.open('GET', '/path');
      request.send();

      request.responseText;
      request.status;
      request.statusText;
    ```

    - data serialization:
      - query strings
        ```js
          encodeURIComponent(title=Do Androids Dream of Electric Sheep?&year=1968;) //title=Do%20Androids%20Dream%20of%20Electric%20Sheep%3F&year=1968
        ```
        - if sending data serialized as query string with a POST request, you must include a Content-Type header with a value of `application/x-www-form-urlencoded`
      - multipart form data
        - `FormData` object can be used to collect data;
        ```
          POST /path HTTP/1.1
          Host: example.test
          Content-Length: 267
          Content-Type: multipart/form-data; boundary=----WebKitFormBoundarywDbHM6i57QWyAWro
          Accept: */*

          ------WebKitFormBoundarywDbHM6i57QWyAWro
          Content-Disposition: form-data; name="title"

          Do Androids Dream of Electric Sheep?
          ------WebKitFormBoundarywDbHM6i57QWyAWro
          Content-Disposition: form-data; name="year"

          1968
          ------WebKitFormBoundarywDbHM6i57QWyAWro--
        ```
      - JSON serialization
        - GET request can return JSON, but POST must be used to send JSON data to the server
        ```
          POST /path HTTP/1.1
          Host: example.test
          Content-Length: 62
          Content-Type: application/json; charset=utf-8
          Accept: */*

          {"title":"Do Androids Dream of Electric Sheep?","year":"1968"}
      - It's best practice to include `charset=utf-8` in `Content-Type` except when using multipart form format.

  - rendering the response to the page
    - We can retrieve HTML fragments (parts of whole pages) from a server and insert them into a page. This approach works well for applications that primarily use server-side rendering to generate the user interface:
      ```js
        request.addEventListener('load', function(event) {
          store.innerHTML = request.response;
        });
      ```
    - Another approach is loading data in a primitive data structure and render it with the client-side code. This situation often occurs when the user interface has widgets that the server doesn't render.
      ```js
        var request = new XMLHttpRequest();
        request.open('GET', 'https://api.github.com/repos/rails/rails');
        request.responseType = 'json';

        request.addEventListener('load', function(event) {
          // request.response will be the result of parsing the JSON response body
          // or null if the body couldn't be parsed or another error
          // occurred.

          var data = request.response;
        });

        request.send();
      ```
  - Throttling XML requests
  - delay sending XHR for a short period or not sending at all if we no longer need it;
  - JSlibraries provide a function named `debounce`;
