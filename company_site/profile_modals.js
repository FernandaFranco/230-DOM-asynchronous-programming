$(function() {
  $('#team li > a').click(function(event) {
    event.preventDefault();

    var $e = $(this);
    $e.siblings(".modal").css({
      top: $(window).scrollTop() + 30
    });

    $e.nextAll('div').fadeIn(400);
  });

  $('.modal_layer, a.close').click(function(e) {
    e.preventDefault();

    $('.modal_layer, .modal').filter(':visible').fadeOut(400);
  })
});
