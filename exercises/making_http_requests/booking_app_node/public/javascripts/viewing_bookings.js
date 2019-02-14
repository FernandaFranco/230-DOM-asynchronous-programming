(() => {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', '/api/bookings');
  xhr.responseType = 'json';

  xhr.addEventListener('load', (e) => {
    let dates = xhr.response;

    dates.forEach((date) => {
      getBookings(date);
    });

    document.querySelector('#dates').addEventListener('click', (e) => {
      console.log(e.target.querySelector('ul'));
      e.target.querySelector('ul').style = '';
    });
  });

  xhr.send();
})();

let getBookings = (date) => {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', `/api/bookings/${date}`);
  xhr.responseType = 'json';

  xhr.addEventListener('load', (e) => {
    bookings = xhr.response;

    bookings.forEach((booking) => {
      show(date, booking);
    });
  });

  xhr.send();
};

let show = (date, booking) => {
  let dateId = 'date_' + date.split('-').join('_');
  let dateItem = document.querySelector(`#${dateId}`);
  let bookingList;
  if (!dateItem) {
    dateItem = document.createElement('li');
    dateItem.textContent = date;
    dateItem.id = dateId;
    document.querySelector('#dates').appendChild(dateItem);
    bookingList = document.createElement('ul');
    dateItem.appendChild(bookingList);
  } else {
    bookingList = dateItem.querySelector('ul');
  }

  bookingList.style.display = 'none';
  let bookingItem = document.createElement('li');
  booking = booking.join(' | ');
  bookingItem.textContent = booking;
  bookingList.appendChild(bookingItem);
}



