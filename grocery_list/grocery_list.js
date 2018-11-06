$(function() {
  var $ul = $('ul');

  function addItem(item, quantity) {
    $ul.append('<li>' + quantity + ' ' + item + '</li>');
  }

  $('form').submit(function(event) {
    event.preventDefault();
    var $form = $('form');
    var item = $form.find('#item').val();
    var quantity = $form.find('#quantity').val() || 1;

    addItem(item, quantity);
    $('form').get(0).reset();
  })
});
