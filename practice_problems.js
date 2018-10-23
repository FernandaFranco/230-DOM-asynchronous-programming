$(function() {
  var $p = $('p');
  var OUTPUT = 'Your favorite fruit is ';
  $('a').click(function(event) {
    event.preventDefault();
    var $anchor = $(this);

    $p.text(OUTPUT + $anchor.text());
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var $input = $(this).find('input[type=text]');
    $p.text(OUTPUT + $input.val());
  });
});
