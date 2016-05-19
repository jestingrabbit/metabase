var app = app || {};

app.ColumnView = Backbone.View.extend({

  tagName: 'div',
  className: 'columnView',

  events: {
    // one for save and enter save... later an edit.
  },

  render: function (options) {
    var self = this;

    if (options && options.editing) {
      this.$el
        .addClass('editing')
        .html($('#columnEditingTemplate').text());

      this.$nameInput = this.$el.find('input.name');
      this.$dataTypeInput = this.$el.find('select.data_type');

      if (this.model.get('name')) {
        this.$nameInput.val(this.model.get('name'));
        this.$dataTypeInput.val(this.model.get('data_type'));
      }
      setTimeout( function () {
        self.$nameInput.focus();
      }, 17);
      this.$el.css({
        color: this.model.get('color')
      });
    } else {

    }

    return this;
  }



})
