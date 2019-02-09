var request = new XMLHttpRequest();

request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');

request.setRequestHeader('Authorization', 'token AUTH_TOKEN');
request.setRequestHeader('Content-Type', 'application/json');

var data = {
  name: 'pen master plus 4000',
  sku: 'penm4000',
  price: '4000',
};

var json = JSON.stringify(data);

request.addEventListener('load', function(e) {
  console.log(request.response);
  console.log(request.status);
});

request.send(json);
