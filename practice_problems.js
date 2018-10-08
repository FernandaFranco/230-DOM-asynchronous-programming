function walk(node, callback) {
  callback(node);

  var i;
  for (i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function domTreeTracer(id) {
  var elem = document.getElementById(id);
  var result = [];
  while (elem) {
    result.push(siblingsOf(elem));
    elem = elem.parentElement;
  }

  return result;
}


function siblingsOf(elem) {
  var sibilings = [];
  while (elem) {
    sibilings.push(elem);
    elem = elem.nextElementSibling;
  }

  return sibilings;
}
