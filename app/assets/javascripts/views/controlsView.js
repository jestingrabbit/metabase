app = app || {};

app.ControlsView = Backbone.View.extend({

  el: '.bottom-right',

  events: {
    'click #newTable': 'makeNewTable',
    'click button#save': 'saveEverything',
  },

  makeNewTable: function (e) {
    if (!$('button#newTable').hasClass('disabled')){
      this.$el.find('button#newTable').blur();
      var newTable = new app.Table({plural: 'plural'}, {database: app.database});
      app.database.tables.add(newTable);
      setTimeout( function () {
        $('button#newTable').removeClass('disabled');
      }, 1000);
    }
  },

  saveEverything: function () {
    // work out what you need to save and do it.
  }

});
