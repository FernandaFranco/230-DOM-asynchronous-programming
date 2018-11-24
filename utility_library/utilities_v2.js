function _(element) {
  function match(object, collectionObj) {
    for (var property in object) {
      if (object[property] !== collectionObj[property]) {
        return false;
      }
    }
    return true;
  }

  var methods = {
    first: function() {
      return element[0];
    },
    last: function() {
      return element[element.length - 1];
    },
    without: function() {
      var newArray = element.slice();
      var args = [].slice.apply(arguments);
      args.forEach(function(value) {
        newArray.splice(newArray.indexOf(value), 1);
      });

      return newArray;
    },
    lastIndexOf: function(value) {
      var i;

      for (i = element.length - 1; i >= 0; i -= 1) {
        if (element[i] === value) {
          return i;
        }
      }

      return -1;
    },
    sample: function(value) {
      var copy = element.slice();
      var result = [];
      var randomIdx = function() {
        return Math.floor(Math.random() * copy.length);
      }

      if (value) {
        while (value > 0) {
          result.push(copy.splice(randomIdx(), 1)[0]);
          value -= 1;
        }

        return result;
      }

      return element[randomIdx()];
    },
    findWhere: function(object) {
      var result = undefined;
      var i;

      for (i = 0; i < element.length; i += 1) {
        if (match(object, element[i])) {
          result = element[i];
          break;
        }
      }

      return result;
    },
    where: function(object) {
      var result = [];
      var i;

      for (i = 0; i < element.length; i += 1) {
        if (match(object, element[i])) {
          result.push(element[i]);
        }
      }

      return result;
    },
    pluck: function(property) {
      var result = [];
      var i;

      for (i = 0; i < element.length; i += 1) {
        if (element[i][property]) {
          result.push(element[i][property]);
        }
      }

      return result;
    },
    keys: function() {
      var result = [];
      var i;

      for (property in element) {
        result.push(property);
      }

      return result;
    },
    values: function() {
      var result = [];
      var i;

      for (property in element) {
        result.push(element[property]);
      }

      return result;
    },
    pick: function() {
      var properties = [].slice.call(arguments);
      var newObject = {}
      properties.forEach(function(property) {
        newObject[property] = element[property];
      });

      return newObject;
    },
    omit: function() {
      var properties = [].slice.call(arguments);
      var newObject = element;
      properties.forEach(function(property) {
        delete newObject[property];
      });

      return newObject;
    },
    has: function(property) {
      return !!element[property];
    },
    isElement: function() {
      return _.isElement(element);
    },
    isArray: function() {
      return _.isArray(element);
    },
    isObject: function() {
      return _.isObject(element);
    },
    isFunction: function() {
      return _.isFunction(element);
    },
    isBoolean: function() {
      return _.isBoolean(element);
    },
    isString: function() {
      return _.isString(element);
    },
    isNumber: function() {
      return _.isNumber(element);
    },

  }

  return methods;
}

_.range = function(start, end) {
  var i;
  var result = [];

  if (!end) {
    end = start;
    start = 0;
  }

  for (i = start; i < end; i += 1) {
    result.push(i);
  }

  return result;
};

_.extend = function() {
  objects = [].slice.call(arguments);

  while (objects.length > 1) {
    var lastObjects = objects.splice(-2, 2);
    for (prop in lastObjects[1]) {
      lastObjects[0][prop] = lastObjects[1][prop];
    }
    objects.push(lastObjects[0]);
  }

  return objects[0];
}

_.isElement = function(element) {
  return element.nodeType === 1;
}

_.isArray = function(element) {
  return toString.call(element) === '[object Array]';
}

_.isObject= function(element) {
  return typeof element === 'object' || typeof element === 'function';
}

_.isFunction = function(element) {
  return typeof element === 'function';
}

_.isBoolean = function(element) {
  return typeof element === 'boolean' || element.constructor === Boolean;
}

_.isString = function(element) {
  return typeof element === 'string'|| element.constructor === String;
}

_.isNumber = function(element) {
  return typeof element === 'number' || element.constructor === Number;
}

