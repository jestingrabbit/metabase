app = app || {};

app.TableNameView = Backbone.View.extend({

  tagName: 'div',
  className: 'tableNameView',

  events: {
    'click button.save' : 'saveName',
    'keypress input' : 'saveOnEnter',
    'mouseenter' : 'makeDraggableParent',
    'mouseleave' : 'stopDraggable'
  },

  render: function (options) {
    if (options && options.editing) {
      this.$el
        .addClass('editing')
        .html($('#tableNameEditingTemplate').text());
      var input = this.$el.find('input');
      this.$input = input;
      if (this.model.get('plural')) {
        this.$input.val(this.model.get('plural'));
      }
      setTimeout( function () {
        input.focus();
      }, 17);
      this.$el.find('button').css({
        'border': "1px solid "+ this.model.get('color'),
        'border-radius': "3px"
      })

    } else {
      this.$el.empty();
      this.$el.text(this.model.get('plural'));
    }

    return this;
  },

  saveName: function () {
    var self = this;
    this.model.set('plural', this.$input.val());
    this.model.save().done( function () {
      self.render()
        .$el.removeClass('editing');
    });
    this.render();
  },

  saveOnEnter: function( e ) {
    if ( e.which === ENTER_KEY ) {
      this.saveName();
    }
  },

  makeDraggableParent: function () {
    this.model.view.$el.draggable({
      containment: '#main'
    });
    this.model.draggable = true;
  },

  stopDraggable: function () {
    if (this.model.draggable){
      this.model.draggable = false;
      this.model.set({
        top: parseInt(this.model.view.$el.css('top')),
        left: parseInt(this.model.view.$el.css('left'))
      });
      this.model.save();
      this.model.view.$el.draggable('destroy');
    }
  }

});
