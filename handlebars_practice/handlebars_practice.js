var posts = [];
var post = {
  title: 'Lorem ipsum dolor sit amet',
  published: 'April 1, 2015',
  body: '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>',
  tags: ['health', 'writting'],
};

posts.push(post);

var second_post = {
  title: 'Amem Aleluia',
  published: 'April 1, 2018',
  body: '<p>I love ramem</p>',
};

posts.push(second_post);
console.log(posts);

$(function() {
  var template = $('#posts').html();

  var templateScript = Handlebars.compile(template);
  Handlebars.registerPartial('tag', $('#tag').html());

  var html = templateScript({posts: posts});

  $(document.body).append(html);
});
