var app = app || {};

app.ColumnView = Backbone.View.extend({

  tagName: 'div',
  className: 'columnView clearfix',

  events: {
    'click button.save': 'saveColumn',
    'keypress' : 'checkForEnterAndComplete',
  },

  render: function (options) {
    var self = this;
    this.$el.empty();

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
      var template = _.template($('#columnTemplate').text());
      this.$el.html(template(this.model.attributes));
    }

    return this;
  },

  saveColumn: function () {
    var self = this;
    this.model.set({
      'name': this.$nameInput.val(),
      'data_type': this.$dataTypeInput.val()
    });
    this.model.save().done( function () {
      self.model.table.view.$el.find('.disabled').removeClass('disabled');
      self.$el.removeClass('editing');
      self.render();
    });
  },

  checkForEnterAndComplete: function( e ) {
    if ( e.which === ENTER_KEY && this.$el.hasClass('editing')) {
      if ( this.$nameInput.val() && this.$dataTypeInput.val() ){
        this.saveColumn();
      } else if ( this.$nameInput.val() ){
        this.$dataTypeInput.focus();
      } else {
        this.$nameInput.focus();
      }
    }
  },

});
