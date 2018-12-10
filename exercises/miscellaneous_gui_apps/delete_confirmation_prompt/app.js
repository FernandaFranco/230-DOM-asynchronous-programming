var todo_items = [{id: 1, title: 'Homework'},
              {id: 2, title: 'Shopping'},
              {id: 3, title: 'Calling Mom'},
              {id: 4, title: 'Coffee with John'}];

var App = {
  renderTemplate: function() {
    Handlebars.registerPartial('todo', $('#todo').remove().html())
    var template = Handlebars.compile($('#todos').remove().html());
    $('ul').append(template({todos: todo_items}));
  },
  launchPrompt: function(e) {
    e.preventDefault();
    var $anchor = $(e.target);
    this.$todo = $anchor.closest('li');
    $('#overlay').show();
    $('#prompt').show();
  },
  closePrompt: function(e) {
    $('#overlay').hide();
    $('#prompt').hide();
  },
  deleteTodo: function(e) {
    this.$todo.remove();
  },
  launchContextMenu: function(e) {
    e.preventDefault();
    $('.context_menu').show();
  },
  bindEvent: function() {
    $('ul').on('click', 'a.delete', this.launchPrompt.bind(this));
    $('#yes').on('click', this.deleteTodo.bind(this));
    $('#delete').on('click', this.launchPrompt.bind(this));
    $('.button').on('click', this.closePrompt);
    $('#overlay').on('click', this.closePrompt);
    $('ul').on('contextmenu', 'li', this.launchContextMenu)
  },
  init: function() {
    this.renderTemplate();
    this.bindEvent();
  },
};

$(function() {
  App.init();
});
