$(function() {
  var $blinds = $('[id^=blind');
  $blinds.each(function(i) {
    var $blind = $blinds.eq(i);
    $blind.slideUp(250).delay(i * 1500);
  });
});
