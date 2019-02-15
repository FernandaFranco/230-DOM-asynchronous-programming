function cancelingSchedules(scheduleId) {
  //staff cancels schedule

  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', `/api/schedules/${scheduleId}`);

  xhr.addEventListener('load', (e) => {
    if (xhr.status === 204) {
      alert('Schedule deleted.');
    } else {
      alert('Deleting failed: ' + xhr.responseText);
    }
  });

  xhr.send();
}

function cancelingBookings(bookingId) {
  // student cancels a booking
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', `/api/bookings/${bookingId}`);

  xhr.addEventListener('load', (e) => {
    if (xhr.status === 204) {
      alert('Booking canceled.');
    } else {
      alert('Canceling failed: ' + xhr.responseText);
    }
  });

  xhr.send();
}
