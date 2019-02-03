document.querySelector('html').addEventListener('click', function() {
  var container = document.querySelector('#container');

  if (!container.contains(event.target)) {
    container.style = 'display: none';
  }
});
