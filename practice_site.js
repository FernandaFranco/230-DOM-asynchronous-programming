$(function() {
  $('a').click(function(e) {
    e.preventDefault();

    console.log($('article').hide().filter('[data-block=' + $(this).attr('data-block') + ']'));
    $('article').hide().filter('[data-block=' + $(this).attr('data-block') + ']').show();
  });
});
