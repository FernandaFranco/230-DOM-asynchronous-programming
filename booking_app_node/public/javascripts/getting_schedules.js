document.addEventListener('DOMContentLoaded', function(event) {
  function retrieveAvailableSchedules() {
  var request = new XMLHttpRequest;
  request.open('GET', '/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', function(event) {
    var available = request.response.filter(function(schedule) {
      return !schedule.student_email;
    });
    if (available.length > 0) {
      var tally = {};
      available.forEach(function(schedule) {
        var staff = 'staff ' + String(schedule.staff_id);
        if (!tally[staff]) {
          tally[staff] = 0;
        }
        tally[staff] += 1;
      });

      alert(JSON.stringify(tally));
    } else {
      alert('There are no available schedules to be booked.');
    }
  });

  request.addEventListener('timeout', function(event) {
    alert('It is taking loinger than usual, please try again later.');
  });

  request.addEventListener('loadend', function(event) {
    alert('The request has been completed');
  })

  request.send();
}
  retrieveAvailableSchedules();
});
