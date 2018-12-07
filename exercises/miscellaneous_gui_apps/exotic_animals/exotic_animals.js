var App = {
  duration: 300,
  startTimer: function(e) {
    this.timer = setTimeout(function() {
      $(e.currentTarget).find('figcaption').fadeIn(this.duration);
    }, 2000);
  },
  handleMouseLeave: function(e) {
    clearTimeout(this.timer);
    $(e.currentTarget).find('figcaption').fadeOut(this.duration);
  },
  init: function() {
    $('ul').on('mouseenter', 'figure', this.startTimer.bind(this));
    $('ul').on('mouseleave', 'figure', this.handleMouseLeave.bind(this));
  },
};

$(function() {
  App.init();
});
