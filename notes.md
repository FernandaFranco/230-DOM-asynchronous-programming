* DOM

  * Object representation of an HTML document. It provides a way to interact with a web page using JavaScript.

  * JavaScript is the syntax, the DOM is where stuff goes down. A DOM node can be a DOM element, a text node, a comment, or other types. DOM nodes have properties.

  * Browsers insert missing elements like `HEAD` and `BODY` in the DOM even if the corresponding tags don't appear in our HTML, since a fundamental tenet of the web is permissiveness; they always do their best to display HTML even when it has errors.

* Recursion in the DOM: Walking the tree

* Array-like objects: Containers for other objects indexed by non-negative integers. Generally don't support array abstraction methods;

* Template strings are an ES6 construct that allow us to use JavaScript expression inside strings by using a dollar sign followed by curly braces

* Capturing and Bubbling

* The browser waits for the event object to go through the propagation phases (capturing and bubbling) before it performs the default action of the event. If there's an event handler with a preventDefault call somewhere in the propagation path, the default behavior is skipped.

* Code that must access the DOM should be invoked after the DOMContentLoaded event fires on document.

* Douglas Crockford lecture: An inconvenient API

  * Place script tags as close to the bottom of the body as possible. And place CSS link tags as high in the head as possible.

* event.stopPropagation vs event.preventDefault

  * event.stopPropagation stops the succeeding event listeners from firing but it doesn't prevent the default behavior of a event on a element which initiates the default behavior.

* jQuery

  * jQuery also accepts camel case property names instead. Whenever you have a CSS property that includes one or more hyphens, you can omit the hyphens and capitalize the next letter instead. For font-size, for example, you can use fontSize instead.

