$(function() {
  function getFormObject($form) {
    var result = {};

    $form.serializeArray().forEach(function(input) {
      result[input.name] = input.value;
    });

    return result;
  }

  function resetElement($div) {
    var data = $div.data();

    $div.css({
        top: +data.start_y,
        left: +data.start_x,
      });
  }

  function createElement(data) {
    var $div = $('<div />', {
      'class': data.shape_type,
      data: data,
    });

    resetElement($div);

    return $div;
  }

  function animateElement() {
    var $div = $(this);
    resetElement($div);

    $div.animate({
      top: +$div.data('end_y'),
      left: +$div.data('end_x'),
    }, 1000);
  }

  $('form').submit(function(e) {
    e.preventDefault();
    var data = getFormObject($(this));
    $('#canvas').append(createElement(data));
  });

  $('#animate').click(function(e) {
    e.preventDefault();
    var $shapes = $('#canvas > div');

    $shapes.each(animateElement);
  });

  $('#stop').click(function(e) {
    e.preventDefault();
    var $shapes = $('#canvas > div');
    $shapes.stop();
  });
});
