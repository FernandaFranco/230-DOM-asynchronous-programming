$(function() {
  var $blinds = $('[id^=blind');

  function startAnimation(delay, speed) {
    $blinds.each(function(i) {
      var $blind = $blinds.eq(i);
      var totalDelay = (delay * i) + speed;

      $blind.delay(totalDelay).animate({
        top: '+=height',
        height: '0',
      }, speed);
    });
  }

  $('a').click(function(e) {
    e.preventDefault();
    $blinds.finish();
    $blinds.removeAttr('style');
    startAnimation(1500, 250);
  });

  startAnimation(1500, 250);
});
