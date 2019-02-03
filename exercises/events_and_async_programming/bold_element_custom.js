function makeBold(element) {
  var event = new CustomEvent('bolded');
  element.style.fontWeight = 'bold';
  element.dispatchEvent(event);
}

var sectionElement = document.querySelector('section');

sectionElement.addEventListener('bolded', function(e) {
  e.target.classList.add('highlight');
});

makeBold(sectionElement);

sectionElement.classList.contains('highlight');
sectionElement.style.fontWeight;
