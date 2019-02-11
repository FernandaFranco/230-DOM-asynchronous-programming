document.addEventListener('DOMContentLoaded', function() {
  function formDataToJson(formData) {
    var json = [];
    var schedule;
    var i;

    for (i = 0; i < scheduleCount; i += 1) {
      schedule = {}
      schedule.staff_id = form['staff_' + String(i + 1)].value;
      schedule.date = form['date_' + String(i + 1)].value;
      schedule.time = form['time_' + String(i + 1)].value;
      json.push(schedule);
    }

    return json;
  }

  function populateSelectInput() {
    var request = new XMLHttpRequest;
    request.open('GET', '/api/staff_members');
    request.responseType = 'json';
    request.addEventListener('load', function(event) {
      var staff_members = request.response;
      var select = document.querySelector('select');

      staff_members.forEach(function(staff) {
        var option = "<option value='" + staff.id + "'>" + staff.name + "</option>"

        select.insertAdjacentHTML('beforeend', option);
      });
    });

    request.send();
  }

  populateSelectInput();

  var form = document.getElementsByTagName('FORM')[0];
  var button = document.querySelector('button');

  button.addEventListener('click', function(event) {
    event.preventDefault();
    var new_schedule = '<fieldset>\
        <legend>Schedule 1</legend>\
        <label for="staff_id">Staff Name:\
          <select id="staff_id" name="staff_id"></select>\
        </label>\
        <label for="date">Date:\
          <input type="text" id="date" name="date" placeholder="mm-dd-yy" />\
        </label>\
        <label for="time">Time:\
          <input type="text" id="time" name="time" placeholder="hh:mm" />\
        </label>\
      </fieldset>';
    form.insertAdjacentHTML('beforeend', new_schedule);
    populateSelectInput();
  });


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
        alert('Schedule added');
      }
    });

    request.setRequestHeader('Content-Type', 'application/json');
    request.send(json);
  });
});
