document.addEventListener('DOMContentLoaded', function() {
  function formDataToJson(formData) {
    var json = {};
    for (var pair of formData.entries()) {
        json[pair[0]] = pair[1];
    }

    return json;
  }

  var form = document.getElementsByTagName('FORM')[0];

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var data = new FormData(form);
    var json = JSON.stringify(formDataToJson(data));

    var request = new XMLHttpRequest;

    request.open('post', form.action);

    request.addEventListener('load', function(event) {
      if (request.status === 400) {
        alert(request.response);
      } else if (request.status === 201) {
        var responseBody = JSON.parse(request.response)
        alert('Successfully created staff with id: ' + responseBody.id)
      }
    });

    request.setRequestHeader('Content-Type', 'application/json');
    request.send(json);
  });
});
