$(function() {
  var $blinds = $('[id^=blind');
  var speed = 250;
  var delay = 1500;
  var totalDelay;

  $blinds.each(function(i) {
    var $blind = $blinds.eq(i);
    totalDelay = (delay * i) + speed;

    $blind.delay(totalDelay).animate({
      top: '+=height',
      height: '0',
    }, speed);
  });
});
