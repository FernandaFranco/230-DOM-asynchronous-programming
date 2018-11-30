var $message = $('#message');
var $letters = $('#spaces');
var $guesses = $('#guesses');
var $apples = $('#apples');
var $replay = $("#replay");

var randomWord = function() {
  var words = ['abacus', 'quotient', 'octothorpe', 'proselytize', 'stipend'];

  return function() {
    var randomIdx = Math.floor(Math.random() * words.length);
    return words.splice(randomIdx, 1)[0];
  };
}();

var Game = {
  allowedGuesses: 6,
  createBlanks: function() {
    var i;

    $letters.find('span').remove();
    for (i = 0; i < this.word.length; i += 1) {
      $letters.append('<span></span>');
    }
  },
  fillBlanksFor: function(guess) {
    var i;

    for (i = 0; i < this.word.length; i += 1) {
      if (this.word[i] === guess) {
        $letters.find('span').eq(i).text(guess);
        this.correctSpaces += 1;
      }
    }
  },
  emptyGuesses: function() {
    $guesses.find('span').remove();
  },
  renderGuess: function(guess) {
    $guesses.append('<span>' + guess + '</span>');
  },
  renderIncorrectGuess: function(guess) {
    this.incorrect += 1;
    this.renderGuess(guess);
    this.setClass();
  },
  setClass: function() {
    $apples.removeClass().addClass('guess_' + this.incorrect);
  },
  win: function() {
    this.unbind();
    this.displayMessage('You win!!!');
    this.setGameStatus('win');
    this.toggleReplayLink(true);

  },
  lose: function() {
    this.unbind();
    this.displayMessage('Sorry! You\'re out of guesses!');
    this.setGameStatus('lose');
    this.toggleReplayLink(true);

  },
  duplicateGuess: function(guess) {
    var duplicate = this.lettersGuessed.indexOf(guess) !== -1;
    if (!duplicate) {
      this.lettersGuessed.push(guess);
    }

    return duplicate;
  },
  setGameStatus: function(status) {
    $(document.body).removeClass();
    if (status) {
      $(document.body).addClass(status);
    }
  },
  processGuess: function(event) {
    event.preventDefault();
    var guess = event.key.toLowerCase();
    if (notALetter(guess)) { return; }
    if (this.duplicateGuess(guess))  { return; }
    if (this.word.indexOf(guess) !== -1) {
      this.fillBlanksFor(guess);
      this.renderGuess(guess);

      if (this.correctSpaces === this.word.length) {
        this.win();
      }

    } else {
      this.renderIncorrectGuess(guess);
    }

    if (this.incorrect === this.allowedGuesses) {
      this.lose();
    }
  },
  displayMessage: function(text) {
    $message.text(text);
  },
  toggleReplayLink: function(which) {
    $replay.toggle(which);
  },
  bind: function() {
    $(document).on('keypress.game', this.processGuess.bind(this));
  },
  unbind: function() {
    $(document).off('.game');
  },
  init: function() {
    this.incorrect = 0;
    this.word = randomWord();
    if (!this.word) {
      this.displayMessage('Sorry, I\'ve run out of words');
      this.toggleReplayLink(false);
    } else {
      this.lettersGuessed = [];
      this.correctSpaces = 0;
      this.bind();
      this.setClass();
      this.emptyGuesses();
      this.createBlanks();
      this.setGameStatus();
      this.displayMessage('');
    }

    this.toggleReplayLink(false);
    return this;
  },
};

var game = Object.create(Game).init();

function notALetter(guess) {
  return guess < 'a' || guess > 'z';
}

$replay.click(function(event) {
  event.preventDefault();
  game = Object.create(Game).init();
});
