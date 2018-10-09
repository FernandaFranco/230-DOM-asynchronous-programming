var id;

function startCounting() {
  var n = 1;
  id = setInterval(function() {
    console.log(n);
    n += 1;
  }, 1000);
}

// startCounting();

function stopCounting() {
  clearInterval(id);
}

// stopCounting();
