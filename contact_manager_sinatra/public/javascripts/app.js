const App = {
  ANIMATION_DELAY: 300,
  tags: ['friends', 'work', 'school'],
  handleForm(e) {
    e.preventDefault();

    // $('#home_container').slideToggle(this.ANIMATION_DELAY);
    $('#create_contact').slideToggle(this.ANIMATION_DELAY);
  },
  handleTagging(e) {
    const template = Handlebars.compile($('#tags_template').html());
    Handlebars.registerPartial('tag', $('#tag_template').html());
    $('#tags').after(template({ tags: this.tags }));
  },
  handleCancelling(e) {
    e.preventDefault();
    $('#create_contact').slideToggle(this.ANIMATION_DELAY);
    // $('#home_container').slideToggle(this.ANIMATION_DELAY);
  },
  handleAddingContact(e) {
    e.preventDefault();
  },
  bindEvents() {
    $('.add_contact').on('click', this.handleForm.bind(this));
    $('#tags').on('focus', this.handleTagging.bind(this));
    $('#cancel').on('click', this.handleCancelling.bind(this));
    $('#create_contact').on('submit', this.handleAddingContact.bind(this));
  },
  init() {
    this.bindEvents();
  },
};

$(App.init.bind(App));
