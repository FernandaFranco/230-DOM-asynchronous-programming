$(function() {
  $('a').click(function(event) {
    event.preventDefault();
    var $input = $(this).find('input[type=text]');
    $p.text(OUTPUT + $input.val());
  });
});
