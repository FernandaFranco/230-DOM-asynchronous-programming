var request = new XMLHttpRequest();

request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
request.setRequestHeader('Authorization', 'token AUTH_TOKEN');
request.setRequestHeader('Content-Type', 'application/json');
var data = { name: "Nail Polisher", sku: "nail100", price: 100};

data = JSON.stringify(data);

request.addEventListener('load', function(event) {
  console.log(request.response);;
})
request.send(data);
