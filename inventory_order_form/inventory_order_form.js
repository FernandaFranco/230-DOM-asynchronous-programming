var inventory;

(function() {
  inventory = {
    id: 0,
    collection: [],
    setDate: function() {
      var date = new Date();
      $('#order_date').append('<time datetime="' + date.toISOString() + '">'
                              + date.toUTCString() + '</time>');
    },
    add: function() {
      var item = {
        id: this.id,
        name: '',
        stockNumber: '',
        quantity: 1,
      };
      this.collection.push(item);
      this.id += 1;

      return item;
    },
    remove: function(id) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== id;
      });
    },
    get: function(id) {
      var foundItem;
      $.each(this.collection, function(item) {
        if (item.id === id) {
          foundItem = item;
          return false;
        }
      });

      return foundItem;
    },
    update: function($item) {
      var id = this.findId($item);
      console.log(id);
      var item = this.get(id);
      console.log(item);
      item.name = $item.find('[name^=item_name]').val();
      item.stockNumber = $item.find('[name^=item_stock_number]').val();
      item.quantity = $item.find('[name^=item_quantity]').val();
    },
    newItem: function(event) {
      event.preventDefault();
      var item = this.add();
      var $item = $(this.template.replace(/ID/g, item.id));
      $('#inventory').append($item);
    },
    findParent: function(event) {
      return $(event.target).closest('tr');
    },
    findId: function($item) {
      return parseInt($item.find('input[type=hidden]').val(), 10);
    },
    deleteItem: function(event) {
      event.preventDefault();
      var $item = this.findParent(event).remove();

      this.remove(this.findId($item));
    },
    updateItem: function(event) {
      var $item = this.findParent(event);

      this.update($item);
    },
    bindEvents: function() {
      $('#add_item').on('click', this.newItem.bind(this));
      $('#inventory').on('click', 'a.delete', this.deleteItem.bind(this));
      $('#inventory').on('blur', ':input', this.updateItem.bind(this));

      function getName(target) {
        var name = target.attr('name');
        return name.replace(/item|_\d*/g, '');
      }


    },
    cacheTemplate: function() {
      this.template = $('#inventory_item').remove().html();
    },
    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    },
  };
})();

$(inventory.init.bind(inventory));


