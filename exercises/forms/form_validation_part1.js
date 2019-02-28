
var App = {
  errorMessage: function(id) {
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
  },
  validateInput: function(e) {
    var input = e.currentTarget;
    var $input = $(input);

    if (!input.checkValidity()) {
      $input.css('border-color', 'red');
      $('<p></p>').insertAfter($input).text(this.errorMessage(input.id));
    } else {
      $input.attr('style', '');
      $input.next('p').remove();
    }
  },
  checkForErrors: function(e) {
    e.preventDefault();
    $('dl input').each(function() {
      if (!this.checkValidity()) {
        $('dl input').trigger('blur');
        var error = $('<p></p>').text('Error');
        $('form').before(error);
        return false;
      }
    });
  },
  removeErrors: function(e) {
    var $input = $(e.currentTarget);
    $input.attr('style', '');
    $input.next('p').remove();
  },
  bindEventHandlers: function() {
    $('fieldset').on('blur', 'input', this.validateInput.bind(this));
    $('fieldset').on('focus', 'input', this.removeErrors.bind(this));
    $('form').on('submit', this.checkForErrors.bind(this));
  },
  init: function() {
    this.bindEventHandlers();
  },
};

$(App.init.bind(App));
