app = app || {};

app.NewDataseFormView = Backbone.View.extend({

  el: '#newDatabase',

  events: {
    'click #newDatabaseButton': 'makeActive',
    'click #makeNewDatabaseButton': 'makeNewDatabase'
  },

  render: function (active) {
    if (active) {
      this.$el.html($('#newDatabaseFormTemplate').text());
    } else {
      this.$el.html($('#newDatabaseButtonTemplate').text());
    }
  },

  makeActive: function () {
    this.render(true);
  },

  makeNewDatabase: function () {
    if (!$('#makeNewDatabaseButton').hasClass('disabled')) {
      $('#makeNewDatabaseButton').addClass('disabled');
      app.database = new app.Database();
      app.database.set('name', this.$el.find('form fieldset input').val());
      app.database.save().done( function() {
        app.router.navigate(app.database.get('name') + '/' + app.database.id);
      });
    }
  }
})
