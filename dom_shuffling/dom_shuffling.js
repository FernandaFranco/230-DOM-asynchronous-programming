$(function() {
  (function fixHeader() {
    var $topHeader = $('header').last();
    var $main = $('main');
    var $topH1 = $('h1').first();
    var $nav = $('nav');
    $main.before($topHeader);
    $nav.before($topH1);
  })();

  (function fixFigures() {
    var $chinImage = $('img[alt="The chin stick"]');
    var $mopImage = $('img[alt="The baby mop"]');
    $('figcaption').first().before($chinImage);
    $('figcaption').last().before($mopImage);
    $('article p').after($('figure'));
  })();
});
