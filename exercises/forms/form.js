$('dl').on('blur', 'input', function(e) {
  var $label = $(this).closest('dd').prev('dt').find('label');
  if ($(e.target)[0].validity.valueMissing) {
    throwErrorMessage.call(this, $label.html() + ' is a required field')
  } else if (this.validity.patternMismatch) {
    throwErrorMessage.call(this, 'Please Enter a valid ' + $label.html() + '.');
    if (this.id === 'password') {
      throwErrorMessage.call(this, 'Password must be at least 10 characters long.');
    }
  }
});

function throwErrorMessage(message) {
  $(this).addClass('invalid');
  $(this).siblings('.error').html(message);
}

$('dl').on('focus', 'input', function(e) {
  $(this).removeClass('invalid');
  $(this).siblings('.error').html('');
});

$('form').on('submit', function(e) {
  e.preventDefault();
  if ($('form')[0].checkValidity()) {
    $('fieldset > p').html('');
  } else {
    $('fieldset > p').html('Form cannot be submitted until errors are corrected.');
    $('input').each(function(_, input) {
      var $label = $(input).closest('dd').prev('dt').find('label');
      if (input.validity.valueMissing) {
        throwErrorMessage.call(input, $label.html() + ' is a required field');
      } else if (input.validity.patternMismatch) {
        throwErrorMessage.call(input, 'Please Enter a valid ' + $label.html() + '.');
        if (input.id === 'password') {
          throwErrorMessage.call(input, 'Password must be at least 10 characters long.');
        }
      }
    });
  }
});
