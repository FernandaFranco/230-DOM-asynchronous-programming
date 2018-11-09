$(function() {
  var $slideshow = $('#slideshow');
  var $nav = $slideshow.find('ul');

  $nav.on('click', 'a', function(e) {
    e.preventDefault();
    var $li = $(e.currentTarget).closest('li');
    var index = $li.index();
    var $figures = $slideshow.find('figure');
    $figures.stop().filter(':visible').fadeOut(300);
    $figures.eq(index).delay(300).fadeIn(300);
    $nav.find('.active').removeClass('active');
    $li.addClass('active');
  });
});
