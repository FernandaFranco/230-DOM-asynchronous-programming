$(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var firstValue = parseInt($('input#firstValue').val(), 10);
    var secondValue = parseInt($('input#secondValue').val(), 10);
    var operator = $('select').val();
    var result = 0;

    if (operator === 'add') {
      result = firstValue + secondValue;
    } else if (operator === 'subtract') {
      result = firstValue - secondValue;
    } else if (operator === 'multiply') {
      result = firstValue * secondValue;
    } else if (operator === 'divide') {
      result = firstValue / secondValue;
    }

    $('h1').text(result);
  });
});
