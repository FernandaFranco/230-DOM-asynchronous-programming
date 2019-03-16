let App = {
  start() {
    this.interval = setInterval(() => {
      this.centiseconds += 1;
      if (this.centiseconds >= 100) {
        this.centiseconds = 0;
        this.seconds += 1;

        if (this.seconds >= 60) {
          this.seconds = 0;
          this.minutes += 1;

          if (this.minutes >= 60) {
            this.minutes = 0;
            this.hours += 1;
          }
        }
      }

      this.displayTime();
    }, 10);
  },
  stop(e) {
    this.$toggleButton.text('Start');
    clearInterval(this.interval);
  },
  displayTime() {
    $('#centiseconds').text(this.centiseconds < 10 ? `0${this.centiseconds}` : this.centiseconds);
    $('#seconds').text(this.seconds < 10 ? `0${this.seconds}` : this.seconds);
    $('#minutes').text(this.minutes < 10 ? `0${this.minutes}` : this.minutes);
    $('#hours').text(this.hours < 10 ? `0${this.hours}` : this.hours);
  },
  toggle(e) {
    e.preventDefault();
    if (this.$toggleButton.text() === 'Start') {
      this.$toggleButton.text('Stop');
      this.start();
    } else {
      this.stop(e);
    }
  },
  reset(e) {
    e.preventDefault();

    this.centiseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.stop();
    this.displayTime();
  },
  bindEvents() {
    this.$toggleButton.on('click', this.toggle.bind(this));
    this.$resetButton.on('click', this.reset.bind(this));
  },
  init() {
    this.centiseconds = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.$toggleButton = $('#toggle');
    this.$resetButton = $('#reset');
    this.bindEvents();
  },
};

$(App.init.bind(App));
