$(function() {
  var templates = {};
  var photos;

  $('script[type="text/x-handlebars"]').each(function() {
    var $tmpl = $(this);
    templates[$tmpl.attr('id')] = Handlebars.compile($tmpl.html());
  });

  $('[data-type=partial]').each(function() {
    var $partial = $(this);
    Handlebars.registerPartial($partial.attr('id'), $partial.html())
  });

  var slideshow = {
    $el: $('#slideshow'),
    duration: 500,
    prevSlide: function(e) {
      e.preventDefault();
      var $current = this.$el.find('figure:visible');
      var $prev = $current.prev('figure');

      if (!$prev.length) {
        $prev = this.$el.find('figure').last();
      }

      $current.fadeOut(this.duration);
      $prev.fadeIn(this.duration);
      this.renderPhotoContent($prev.attr('data-id'));
    },
    nextSlide: function(e) {
      e.preventDefault();
      var $current = this.$el.find('figure:visible');
      var $next = $current.next('figure');

      if (!$next.length) {
        $next = this.$el.find('figure').first();
      }

      $current.fadeOut(this.duration);
      $next.fadeIn(this.duration);
      this.renderPhotoContent($next.attr('data-id'));
    },
    renderPhotoContent: function(id) {
      $('input[name=photo_id]').val(id);

      renderPhotosInformation(+id);
      getCommentsFor(id);
    },
    bindEvents: function() {
      this.$el.find('a.prev').on('click', this.prevSlide.bind(this));
      this.$el.find('a.next').on('click', this.nextSlide.bind(this));
    },
    init: function() {
      this.bindEvents();
    },
  };

  $.ajax({
    url: "/photos",
    success: function(json) {
      photos = json;
      renderPhotos();
      renderPhotosInformation(photos[0].id);
      slideshow.init();
      getCommentsFor(photos[0].id)
    },
  });

  $('section > header').on('click', '.actions a', function(event) {
    event.preventDefault();
    var $anchor = $(this);
    var photo_index = slideshow.$el.find('figure:visible').index();
    var current_photo = photos[photo_index];
    $.ajax({
      url: $anchor.attr('href'),
      data: "photo_id=" + $anchor.attr('data-id'),
      type: "post",
      success: function(json) {
        total = json.total;
        console.log($anchor);
        $anchor.text(function(i, txt) {
          return txt.replace(/\d+/, total);
        });
        current_photo[$anchor.attr('data-property')] = total;
      },
    });
  });

  $('form').on('submit', function(event) {
    event.preventDefault();
    var $form = $(this);
    $.ajax({
      url: $form.attr('action'),
      type: $form.attr('method'),
      data: $form.serialize(),
      success: function(json) {
        $('#comments ul').append(templates.comment(json));
        $form[0].reset();
      },

    });
  });

  function renderPhotos() {
    $('#slides').append(templates.photos({photos: photos}));
  }

  function renderPhotosInformation(id) {
    var photo = photos.filter(function(item) {
      return item.id === id;
    })[0];
    $('section > header').html(templates.photo_information(photo));
  }

  function getCommentsFor(id) {
    $.ajax({
      url: "/comments",
      data: "photo_id=" + id,
      success: function(comment_json) {
        $('#comments ul').html(templates.comments({comments: comment_json}));
      },
    });
  }
});
