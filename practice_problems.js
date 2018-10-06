function walk(node, callback) {
  callback(node);

  var i;
  for (i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}


// var intros = document.getElementsByClassName('intro')
// intros = [].slice.call(intros);
// var paragraphs;
// intros.forEach(function(div) {
//   paragraphs = [].slice.call(div.getElementsByTagName('P'));
//   paragraphs.forEach(function(paragraph) {
//     paragraph.classList.add('article-text');
//     console.log(paragraph);
//   });
// });

var introParagraphs = document.querySelectorAll('.intro p');
introParagraphs = [].slice.call(introParagraphs);
introParagraphs.forEach(function(paragraph) {
  paragraph.classList.add('article-text');
  console.log(paragraph);
});
