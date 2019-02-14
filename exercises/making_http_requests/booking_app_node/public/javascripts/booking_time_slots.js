/*
- make a post request to /api/bookings
- data in json format to send: id (of the schedule) and student_email
- but first, make a get request to /api/schedules to retrieve all schedules
- filter out taken slots
- display available schedules as :staff_name | :date | :time
- keep track of schedule id
- if student doesnt exist in the database, show box for student sign up
- create new booking sequence for student sign up
- after successfully signing up, add student to database (post /api/students) and
create booking
*/

document.addEventListener('DOMContentLoaded', () => {
  let bookingForm = document.querySelector('#booking_form');
  let staffMembers = [];

  (() => {
    let request = new XMLHttpRequest();
    request.open('GET', '/api/staff_members');
    request.responseType = 'json'

    request.addEventListener('load', () => {
      if (request.status === 200) {
        staffMembers = request.response;
      }
    });

    request.send();
  })();

  (() => {
    let request = new XMLHttpRequest();
    request.open('GET', '/api/schedules');
    request.responseType = 'json'

    request.addEventListener('load', () => {
      let freeSchedules = request.response.filter((schedule) => {
        return !schedule.student_email;
      });

      freeSchedules.forEach((schedule) => {
        let bookingSlots = bookingForm.querySelector('select');
        let option = document.createElement('option');
        let staffMember = staffMembers.filter((staffMember) => {
          return schedule.staff_id === staffMember.id;
        })[0];
        option.value = schedule.id;
        option.textContent = `${staffMember.name} | ${schedule.date} | ${schedule.time}`;
        bookingSlots.appendChild(option);
      });
    });

    request.send();
  })();

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let data =
    {
      id: parseInt(bookingForm.querySelector('select').value, 10),
      student_email: bookingForm.querySelector('#email').value,
    };

    let request = new XMLHttpRequest();
    request.open('POST', bookingForm.action);
    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('load', () => {
      if (request.status === 204) {
        alert('Booked');
        bookingForm.reset();
      } else if (request.status === 404) {
        alert(request.response);
        if (request.response !== 'Schedule is either booked or does not exist.') {
          let bookingSequence = parseInt(request.response.split(' ').pop());
          createNewStudent(bookingSequence, data.student_email);
        }
      }
    });

    request.send(JSON.stringify(data));
  });

  let createNewStudent = (bookingSequence, email) => {
    let newStudentForm = document.createElement('form');
    let newStudentName = document.createElement('input');
    let newStudentEmail = document.createElement('input');
    let newStudentBookingSequence = document.createElement('input');
    let newFormSubmitButton = document.createElement('input');
    newStudentForm.setAttribute('action', '/api/students');
    newStudentEmail.value = email;
    newStudentBookingSequence.value = bookingSequence;
    newFormSubmitButton.setAttribute('type', 'submit');
    newStudentForm.appendChild(newStudentName);
    newStudentForm.appendChild(newStudentEmail);
    newStudentForm.appendChild(newStudentBookingSequence);
    newStudentForm.appendChild(newFormSubmitButton);
    document.body.appendChild(newStudentForm);


    newStudentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let request = new XMLHttpRequest();
      let data = {
        email: email,
        booking_sequence: bookingSequence,
        name: newStudentName.value,
      }
      request.open('POST', newStudentForm.action);
      request.setRequestHeader('Content-Type', 'application/json');

      request.addEventListener('load', (e) => {
        alert(request.response);
        if (request.status === 201) {
          let event = new Event('submit');
          bookingForm.dispatchEvent(event);
          newStudentForm.remove();
        }
      });

      request.send(JSON.stringify(data));
    });
  };
});
