- Arrows and Lexical This
  - arrows are different from functions:
    - share same `this` context as surrounding code;
    - if inside another function, shares the `arguments` variable of the parent function;
  - Put another way: does not have its own `this`, `arguments`, `super`, or `new.target`;
  - Better suited for non-method functions;
  - Cannot be used as constructors;
  - Arrow functions do not have a prototype property;
  - Parentheses are optional when there's only one parameter;
  - Parenthesize the body of function to return an object literal expression: `params => ({foo: bar})`;
  - Since arrow functions do not have their own this, the methods call() or apply() can only pass in parameters. thisArg is ignored;
  - arrow functions don't have their own arguments object. use rest parameters as an alternative;
  - Use non-arrow functions for methods that will be called using the object.method() syntax. Those are the functions that will receive a meaningful this value from their caller.
  - Use arrow functions for everything else. (https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/)

- Classes
  ```js
  class Parent() {
    constructor() {
      // instance properties go here
    }

    foo() { // shorthand method definition

    }

    bar() { // instance methods

    }
  }

  class Child extends Parent {
    constructor() {
      super();
    }

    baz() {

    }
  }

  var child = new Child();
  child.bar();
  ```

- Enhanced Object Literals
  - Shorthand method definition:
  ```js
  // ES6 with method syntax
    {
      ...
      addAll(pieces) {
        _.each(pieces, piece => this.add(piece));
      },
      ...
    }
  ```
- Template Strings
  ```js
  let name = 'Fernanda';
  let age = 27;

  let greeting = `Hi, my name is ${name}.
I'm a ${age}-year-old lady!`;
  ```

- Destructuring
  ```js
  let tenses = ['me', 'you', 'she'];
  let [ firstPerson ] = tenses;
  ```
  - READ https://hacks.mozilla.org/2015/05/es6-in-depth-destructuring/
  - You can destructure arguments;

- Default + Rest + Spread
  - Default parameter: (not restricted to primitive values)
    ```js
      function inc(number, increment = 1) {
        return number + increment;
      }
      console.log(inc(2, 2)); // 4
      console.log(inc(2));    // 3
    ```
  - Rest: represent an indefinite number of arguments as an array. Named parameter precedes by three dots becomes an array which contain the arguments.
    ```js
      let len = (...theArgs) => theArgs.length; // len(4, 4, 4) returns 3`;
    ```
  - Spread: split an array to single arguments which are passed to the function as separate arguments.
    ```js
      function sum(a, b, c) {
        return a + b + c;
      }
      var args = [1, 2, 3];
      console.log(sum(…args)); // 6
    ```
  - READ https://hacks.mozilla.org/2015/05/es6-in-depth-rest-parameters-and-defaults/

  ```js
    let func = (param1 = defaultValue1, param2, …, paramN = defaultValueN) => { //statements };
  ```

- Let + Const
  - Block scoped (like in `if (true) { let name = 'Fido' }`); `var` is function scoped;
  0 Unlike variables declared with var, which will start with the value undefined, let variables are not initialized until their definition is evaluated;
  - Can't be declared twice;
  - Unlike var, does not create a property on the global object;
  - Let is the new `var`: variable can be reassigned;
  - Const: can't be reassigned;
    - But the value it references can still be mutated;
    - An initializer for a constant is required; that is, you must specify its value in the same statement in which it's declared (which makes sense, given that it can't be changed later).

- Iterators + For..Of
  - `for...in`

- Promises
  - A returned object to which you attach callbacks, instead of passing callbacks into a function.
  - extremely useful for async success/failure, because you're less interested in the exact time something became available, and more interested in reacting to the outcome. (https://developers.google.com/web/fundamentals/primers/promises#events_arent_always_the_best_way)


