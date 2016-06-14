app = app || {};

app.DatabaseInListView = Backbone.View.extend({

  tagName: 'div',

  events: {
    'click .dbName': 'goToDatabase',
    'click .controls.destroy': 'deleteDatabase',
    'click .controls.edit': 'editName',
    'click .controls.save': 'saveName',
    'keypress input' : 'saveOnEnter'
  },

  render: function (options) {
    var self = this;
    if (options && options.editing) {
      var template = _.template($('#databaseInListEditingTemplate').text());
      this.$el.html(template(this.model.attributes));
      setInterval( function () {
        self.$el.find('input').focus();
      }, 16);
    } else {
      var template = _.template($('#databaseInListTemplate').text());
      this.$el.html(template(this.model.attributes));
    }
    return this;
  },

  goToDatabase: function () {
    app.database = this.model;
    app.router.navigate(this.model.get('name') + '/' + this.model.id, {trigger: true});
  },

  deleteDatabase: function () {

  },

  editName: function () {
    this.render({editing: true});
  },


  saveName: function () {
    var self = this;
    this.model.set('name', this.$el.find('input').val());
    this.model.save().done( function () {
      self.render();
    });
  },

  saveOnEnter: function( e ) {
    if ( e.which === ENTER_KEY ) {
      this.saveName();
    }
  }


});
