var inventory;

(function() {
  function cacheTemplate() {
    var tmpl = $('#inventory_item').html();
    $('#inventory_item').remove();
    return tmpl;
  };

  var template = cacheTemplate();

  inventory = {
    lastId: 0,
    collection: [],
    getCurrentDate: function() {
      var date = new Date();
      return date.toUTCString();
    },
    setDate: function() {
      var $date = $('#order_date');
      $date.text(this.getCurrentDate());
    },
    add: function() {
      this.lastId++;
      var item = {
        id: this.lastId,
        name: '',
        stockNumber: '',
        quantity: 1,
      };
      this.collection.push(item);

      return item;
    },
    newItem: function(e) {
      e.preventDefault();
      var item = this.add();
      var $item = $(template.replace(/ID/g, item.id));
      $('#inventory').append($item);

    },
    remove: function($item) {
      var id = this.findId($item);
      var item = this.get(id);
      this.collection.splice(this.collection.indexOf(item), 1);
    },
    get: function(id) {
      return this.collection.filter(function(item) { return item.id === id })[0];
    },
    update: function($item) {
      var id = this.findId($item);
      var item = this.get(id);

      item.name = $item.find('[name^=item_name]').val();
      item.stockNumber = $item.find('[name^=item_stock_number]').val();
      item.quantity = $item.find('[name^=item_quantity]').val();
    },
    findId: function($item) {
      return +$item.find('input[type=hidden]').val();
    },
    findParent: function(e) {
      return $(e.target).closest('tr');
    },
    deleteItem: function(e) {
      e.preventDefault();
      var $item = this.findParent(e).remove();
      this.delete($item);
    },
    updateItem: function(e) {
      var $item = this.findParent(e);
      this.update($item);
    },
    bindEvents: function() {
      $('#add_item').click(this.newItem.bind(this));
      $('#inventory').on('click', 'a', this.deleteItem.bind(this));
      $('#inventory').on('blur', ':input', this.updateItem.bind(this));
    },
    init: function() {
      this.setDate();
      this.bindEvents();
    }
  };

})();

$(inventory.init.bind(inventory));
