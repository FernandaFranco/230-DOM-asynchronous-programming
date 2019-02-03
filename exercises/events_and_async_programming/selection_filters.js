var classifications = {
  'Vertebrate': ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
  'Cold-blooded': ['Salmon', 'Turtle'],
  'Mammal': ['Bear', 'Whale'],
  'Bird': ['Ostrich'],
};

var animals = {
  'Bear': ['Vertebrate', 'Warm-blooded', 'Mammal'],
  'Turtle': ['Vertebrate', 'Cold-blooded'],
  'Whale': ['Vertebrate', 'Warm-blooded', 'Mammal'],
  'Salmon': ['Vertebrate', 'Cold-blooded'],
  'Ostrich': ['Vertebrate', 'Warm-blooded', 'Bird'],
};

var classificationsElement = document.querySelector('#animal-classifications');
var animalsElement = document.querySelector('#animals');
var clearButton = document.querySelector('#clear');

classificationsElement.addEventListener('change', function(e) {
  animalsElement.innerHTML = '';
  classifications[this.value].forEach(function(animal) {
    animalsElement.insertAdjacentHTML('beforeend', `<option value="${animal}">${animal}</option>`)
  });
})

animalsElement.addEventListener('change', function(e) {
  classificationsElement.innerHTML = '';
  animals[this.value].forEach(function(classification) {
    classificationsElement.insertAdjacentHTML('beforeend', `<option value="${classification}">${classification}</option>`)
  });
})

clearButton.addEventListener('click', function(e) {
  e.preventDefault();
  classificationsElement.innerHTML = '';
  animalsElement.innerHTML = '';

  Object.keys(classifications).forEach(function(classification) {
    classificationsElement.insertAdjacentHTML('beforeend', `<option value="${classification}">${classification}</option>`)
  });

  Object.keys(animals).forEach(function(animal) {
    animalsElement.insertAdjacentHTML('beforeend', `<option value="${animal}">${animal}</option>`)
  });
})
