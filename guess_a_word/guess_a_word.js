var randomWord = function() {
  var words = ['apple', 'banana', 'orange', 'pear'];

  return function() {
    var randomIdx = Math.floor(Math.random() * words.length);
    return words.splice(randomIdx, 1)[0];
  };
}();


function Game() {
  this.word = randomWord();
  this.incorrectGuesses = 0;
  this.allowedGuesses = 6;
  this.letters = [];
}

$(function() {
  var game = new Game;
  var i;

  for (i = 0; i < game.word.length; i += 1) {
    $('#spaces').append('<span></span>');
  }

  $(document).on('keypress', function(event) {
    event.preventDefault();
    var guess = event.key;
    var letterPosition = game.word.indexOf(guess);

    if (letterPosition === -1) {
      $('#guesses').append('<span>' + event.key + '</span>');
    } else {
      console.log(letterPosition);
      $('#spaces span').eq(letterPosition).text(event.key);
      // $('#spaces span').eq(letterPosition).css({color: 'green'});
    }
  });

});
