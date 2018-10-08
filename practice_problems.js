var currentParent = document.body;

function nodesToArr() {
  var currentChildren = [].slice.call(currentParent.children);
  var result = [currentParent.tagName, currentChildren];
  var i;

  for (i = 0; i < currentChildren.length; i += 1) {
    currentParent = currentChildren[i];
    currentChildren[i] = nodesToArr();
  }

  return result;
}


nodesToArr();
