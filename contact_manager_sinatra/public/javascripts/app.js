const App = {
  ANIMATION_DELAY: 300,
  tags: ['friends', 'work', 'school'],
  compileTemplates() {
    this.contactTemplate = Handlebars.compile($('#contact_template').html());
    this.updateFormTemplate = Handlebars.compile($('#update_form_template').html());
    Handlebars.registerPartial('contact', $('#contact_template').html());
    this.contactsTemplate = Handlebars.compile($('#contacts_template').html());
    // this.contact = template({ contacts: this.contacts });
  },
  areValidInputs() {
    return true;
  },
  handleAddForm(e) {
    e.preventDefault();

    $('#home_container').slideToggle(this.ANIMATION_DELAY);
    $('#create_contact').slideToggle(this.ANIMATION_DELAY);
    $('#home_container').after($('#create_contact'));
  },
  handleCancelling(e) {
    e.preventDefault();
    $('#create_contact').slideToggle(this.ANIMATION_DELAY);
    $('#home_container').slideToggle(this.ANIMATION_DELAY);
    $('#create_contact').after($('#home_container'));
  },
  createJSON(form) {
    let obj = {};
    const data = new FormData(form);
    data.forEach((value, key) => {
      obj[key] = value;
    });

    return JSON.stringify(obj);
  },
  createContact(form) {
    const json = this.createJSON(form);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';

    xhr.addEventListener('load', (e) => {
      if (xhr.status === 201) {
        this.retrieveStoredContacts();
        this.handleCancelling(e);
      }
    });

    xhr.send(json);
  },
  handleCreatingContact(e) {
    e.preventDefault();
    const form = e.currentTarget;

    if (this.areValidInputs()) {
      this.createContact(form);
      form.reset();
    }
  },
  handleUpdatingContact(e) {
    e.preventDefault();
    const form = e.currentTarget;

    if (this.areValidInputs()) {
      this.updateContact(form);
      form.reset();
    }
  },
  updateContact(form) {
    const json = this.createJSON(form);
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', form.action);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';

    xhr.addEventListener('load', (e) => {
      if (xhr.status === 201) {
        this.retrieveStoredContacts();
        this.handleCancelling(e);
      }
    });

    xhr.send(json);
  },
  handleEditForm(e) {
    e.preventDefault();
    const url = $(e.currentTarget).attr('href');


    $('main').append(this.updateFormTemplate());
    $('#home_container').slideToggle(this.ANIMATION_DELAY);
    $('#update_contact').slideToggle(this.ANIMATION_DELAY);
    $('#home_container').after($('#update_contact'));
  },
  deleteContact(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url);

    xhr.addEventListener('load', (e) => {
      if (xhr.status === 204) {
        this.retrieveStoredContacts();
      }
    });

    xhr.send();
  },
  handleDeleting(e) {
    e.preventDefault();
    const url = $(e.currentTarget).attr('href');

    alert('Do you want to delete the contact ?');

    this.deleteContact(url);
  },
  bindEvents() {
    $('.add_contact').on('click', this.handleAddForm.bind(this));
    $('#cancel').on('click', this.handleCancelling.bind(this));
    $('#create_contact').on('submit', this.handleCreatingContact.bind(this));
    $('#contacts_container').on('click', '.edit', this.handleEditForm.bind(this));
    $('#update_contact').on('submit', this.handleUpdatingContact.bind(this));
    $('#contacts_container').on('click', '.delete', this.handleDeleting.bind(this));
  },
  retrieveStoredContacts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/contacts');
    xhr.responseType = 'json';

    xhr.addEventListener('load', (e) => {
      if (xhr.status === 200 && xhr.response.length > 0) {
        $('#contacts_container').html(this.contactsTemplate({ contacts: xhr.response }));
      } else {
        $('#no_contacts').show();
      }
    });

    xhr.send();
  },
  init() {
    this.retrieveStoredContacts();
    this.bindEvents();
    this.compileTemplates();
  },
};

$(App.init.bind(App));
