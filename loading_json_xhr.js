var request = new XMLHttpRequest();

request.open('GET', 'https://api.github.com/repos/rails/rails');

// request.responseType = 'json';

request.addEventListener('load', function(event) {
  var data = JSON.parse(request.response);
  console.log(data.open_issues);
  console.log(request.status);
});

request.addEventListener('error', function(event) {
  console.log('The request could not be completed!');
});

request.send();
