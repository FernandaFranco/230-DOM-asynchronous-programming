var cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000},
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corrolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

cars.forEach(function(car) {
  car.year = String(car.year);
  car.price = String(car.price);
});

function filter(cars) {
  return {
    makes: $.uniqueSort(cars.map(function(car) { return car.make; })),
    models: $.uniqueSort(cars.map(function(car) { return car.model; })),
    years: $.uniqueSort(cars.map(function(car) { return car.year; })),
    prices: $.uniqueSort(cars.map(function(car) { return car.price; })),
  };
}


var App = {
  renderTemplate: function() {
    Handlebars.registerPartial('car', $('#car').remove().html())
    this.carsTemplate = Handlebars.compile($('#cars').remove().html());
    this.filterTemplate = Handlebars.compile($('#filter').remove().html());
    $('#cars_container').append(this.carsTemplate({cars: cars}));
    $('#filter_container').append(this.filterTemplate(filter(cars)));
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
  filterSelections: function(e) {
    var $selections = $('#filter_container').find('select');
    var selections = {};
    $selections.each(function(idx, selection) {
      selections[selection.id.slice(0, -7)] = $(selection).val();
    });
    var filters = Object.keys(selections).filter(function(key) { return selections[key]});

    var filteredCars = cars.filter(function(car) {
      return filters.every(function(filter) {
        return car[filter] === selections[filter];
      });
    });
    console.log(filteredCars);
    $('#filter_container').html(this.filterTemplate(filter(filteredCars)));
  },
  filterCars: function(e) {
    e.preventDefault();
    var $selections = $('#filter_container').find('select');
    var selections = {};
    $selections.each(function(idx, selection) {
      selections[selection.id.slice(0, -7)] = $(selection).val();
    });
    var filters = Object.keys(selections).filter(function(key) { return selections[key]});

    var filteredCars = cars.filter(function(car) {
      return filters.every(function(filter) {
        return car[filter] === selections[filter];
      });
    });
    console.log(filteredCars);
    $('#cars_container').html(this.carsTemplate({cars: filteredCars}));
  },
  bindEvent: function() {
    $('select').on('change', this.filterSelections.bind(this))
    $('.filter_btn').on('click', this.filterCars.bind(this))
  },
  init: function() {
    this.renderTemplate();
    this.bindEvent();
  },
};

$(function() {
  App.init();
});
