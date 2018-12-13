$('dl').on('blur', 'input', function(e) {
  e.preventDefault();
  if ($(this).attr) {}
  $(this).addClass('invalid');
  console.log($(this));
});

$('dl').on('focus', 'input', function(e) {
  e.preventDefault();
  $(this).addClass('focus');
  console.log('heheehe');
});
