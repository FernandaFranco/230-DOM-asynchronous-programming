$(function() {
  function errorMessage(id) {
    switch (id) {
      case 'first_name':
      return 'First name is required.';
      case 'last_name':
      return 'Last name is required.';
      case 'email':
      return 'Invalid email. Please provide a valid email.';
      case 'password':
      return 'Invalid password. Please provide a password with at least 10 characters.';
      case 'phone':
      return 'Invalid phone number. Please provide a phone number in the following pattern: 111-222-3333';
    }
  }
  $('fieldset').on('blur', 'input', function(e) {
    var $input = $(this);

    if (!this.checkValidity()) {
      $input.css('border-color', 'red');
      $('<p></p>').insertAfter($input).text(errorMessage(this.id));
    } else {
      $input.attr('style', '');
      $input.next('p').remove();
    }
  });

  $('form').on('submit', function(e) {
    e.preventDefault();
    $('dl input').each(function() {
      if (!this.checkValidity()) {
        $('dl input').trigger('blur');
        var error = $('<p></p>').text('Error');
        $('form').before(error);
        return false;
      }
    });
  });
});
