const App = {
  handleContactCreation(e) {
    e.preventDefault();
    $('#home_container').slideUp(500);
    $('#create_contact').slideDown(500);
  },
  handleCancelling(e) {
    e.preventDefault;
    $('#home_container').slideDown(500);
    $('#create_contact').slideUp(500);
  },
  bindEvents() {
    $('.add_contact').on('click', this.handleContactCreation.bind(this));
    $('#cancel').on('click', this.handleCancelling.bind(this));
  },
  init() {
    $('#create_contact').hide();
    this.bindEvents();
  },
};

$(App.init.bind(App));
