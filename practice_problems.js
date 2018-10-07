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

// var introParagraphs = document.querySelectorAll('.intro p');
// introParagraphs = [].slice.call(introParagraphs);
// introParagraphs.forEach(function(paragraph) {
//   paragraph.classList.add('article-text');
//   console.log(paragraph);
// });


// var notice = document.getElementById('notice');
// document.getElementById('toggle').onclick = function(e) {
//   e.preventDefault();
//   if (notice.getAttribute('class') === 'hidden') {
//     notice.setAttribute('class', 'visible');
//   } else {
//     notice.setAttribute('class', 'hidden');
//   }
// };

// notice.onclick = function(e) {
//   e.preventDefault();
//   this.setAttribute('class', 'hidden');
// };

// var multi = document.getElementById('multiplication');
// multi.innerText = String(13*9);
var addIntroInfo = document.querySelector('.intro').cloneNode(true);
var addIntroInfoLink = addIntroInfo.querySelector('a');

addIntroInfo.firstChild.nodeValue = 'We also have previous new letters.';
addIntroInfoLink.textContent = 'Check them out here.';
addIntroInfoLink.href = 'newsletters.html';

document.body.insertBefore(addIntroInfo, document.querySelector('.form'));
