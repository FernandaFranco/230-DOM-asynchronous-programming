function Autocomplete(url, input) {
  this.input = input;
  this.url = url;

  this.listUI = null;
  this.overlay = null;

  this.wrapInput();
  this.createUI();

  this.valueChanged = debounce(this.valueChanged.bind(this), 300);

  this.bindEvents();
  this.reset();
};

Autocomplete.prototype.wrapInput = function() {
    var wrapper = document.createElement('div');
    wrapper.classList.add('autocomplete-wrapper');
    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input);
  };

Autocomplete.prototype.createUI = function() {
    var listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    this.input.parentNode.appendChild(listUI);
    this.listUI = listUI;

    var overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = this.input.clientWidth + 'px';

    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  };

Autocomplete.prototype.bindEvents = function() {
  this.input.addEventListener('input', this.valueChanged.bind(this));
  this.input.addEventListener('keydown', this.handleKeydown.bind(this));
  this.listUI.addEventListener('mousedown', this.handleMousedown.bind(this));
};

Autocomplete.prototype.handleMousedown = function(event) {
  event.preventDefault();

  var li = event.target;
  if (li.classList.contains('autocomplete-ui-choice')) {
    this.input.value = li.textContent;
    this.reset();
  }
};

Autocomplete.prototype.handleKeydown = function(event) {
  switch(event.key) {
    case 'ArrowDown':
      event.preventDefault();
      if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1) {
        this.selectedIndex = 0;
      } else {
        this.selectedIndex += 1;
      }
      this.bestMatchIndex = null;
      this.draw();
      break;
    case 'ArrowUp':
      event.preventDefault();
      if (this.selectedIndex === null || this.selectedIndex === 0) {
        this.selectedIndex = this.matches.length - 1;
      } else {
        this.selectedIndex -= 1;
      }
      this.bestMatchIndex = null;
      this.draw();
      break;
    case 'Tab':
      if (this.bestMatchIndex !== null) {
        this.input.value = this.matches[this.bestMatchIndex].name;
        event.preventDefault();
      }
      this.reset();
      break;
    case 'Enter':
      this.reset();
      break;
    case 'Escape':
      this.input.value = this.previousValue;
      this.reset();
      break;
  }
};

Autocomplete.prototype.draw = function() {
  var child;
  var suggestion;
  while (child = this.listUI.lastChild) {
    this.listUI.removeChild(child);
  }

  if (!this.visible) {
    this.overlay.textContent = '';
    return;
  }

  if (this.bestMatchIndex !== null) {
    var startIdx = this.input.value.length;
    var selected = this.matches[this.bestMatchIndex];
    suggestion = selected.name.slice(startIdx);
    this.overlay.textContent = this.input.value + suggestion;
  } else {
    this.overlay.textContent = '';
  }

  this.matches.forEach(function(match, index) {
    var li = document.createElement('li');
    li.classList.add('autocomplete-ui-choice');

    if (index === this.selectedIndex) {
      li.classList.add('selected');
      this.input.value = match.name;
    }

    li.textContent = match.name;
    this.listUI.appendChild(li);
  }.bind(this));
};

Autocomplete.prototype.reset = function(query, callback) {
  this.visible = false;
  this.matches = [];
  this.bestMatchIndex = null;
  this.selectedIndex = null;
  this.previousValue = null;

  this.draw();
};

Autocomplete.prototype.valueChanged = function() {
  var value = this.input.value;
  this.previousValue = value;

  if (value.length > 0) {
    this.fetchMatches(value, function(matches) {
      this.visible = true;
      this.matches = matches;
      this.bestMatchIndex = 0;
      this.selectedIndex = null;
      this.draw();
    }.bind(this));
  } else {
    this.reset();
  }
};

Autocomplete.prototype.fetchMatches = function(query, callback) {
  var request = new XMLHttpRequest();

  request.addEventListener('load', function() {
    callback(request.response);
  }.bind(this));

  request.open('GET', this.url + encodeURIComponent(query));
  request.responseType = 'json';
  request.send();
};
