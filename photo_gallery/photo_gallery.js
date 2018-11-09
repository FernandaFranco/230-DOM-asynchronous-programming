$(function() {
  var $slideshow = $('#slideshow');
  var $nav = $slideshow.find('ul');
  var $figures = $slideshow.find('figure');

  function changeImage($visible, $li, index) {
    $visible.fadeOut(300);
    $figures.eq(index).delay(300).fadeIn(300);
    $nav.find('.active').removeClass('active');
    $li.addClass('active');

    // $slideshow.find('.arrow').removeClass('inactive');
    // if (index === 0) {
    //   $slideshow.find('#previous').addClass('inactive');
    // } else if (index === $figures.length - 1) {
    //   $slideshow.find('#next').addClass('inactive');
    // }
  }

  $nav.on('click', 'a', function(e) {
    e.preventDefault();
    var $li = $(e.currentTarget).closest('li');
    var index = $li.index();
    var $visible = $figures.stop().filter(':visible');
    changeImage($visible, $li, index);
  });

  $('#previous').click(function(e) {
    e.preventDefault();
    var $visible = $figures.stop().filter(':visible');
    var index = $visible.index() - 1;
    var $li = $nav.find('li').eq(index);

    if (index === -1) {
      index = $figures.length - 1;
    }

    changeImage($visible, $li, index);
  });

  $('#next').click(function(e) {
    e.preventDefault();
    var $visible = $figures.stop().filter(':visible');
    var index = $visible.index() + 1;
    var $li = $nav.find('li').eq(index);

    if (index === $figures.length) {
      index = 0;
    }

    changeImage($visible, $li, index);
  });
});
