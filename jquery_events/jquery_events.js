$(function() {
  var charCode;
  $('form').submit(function(e) {
    e.preventDefault();
    var key = $('#key').val();
    charCode = key.charCodeAt(0);

    $(document).off('keypress').on('keypress', function(e) {
      if (e.which !== charCode) {
        return;
      }
      $('a').trigger('click');
    });
  });
  $('a').click(function(e) {
    e.preventDefault();
    $('#accordion').slideToggle();
  });
});
