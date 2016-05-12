app = app || {};

var app = app || {};

app.DatabaseListView = Backbone.View.extend({
  el: '#front',

  events: { // nothing to see, they're all in the subviews.
  },

  render: function () {
    app.view = this;
    this.$el.html($('#databaseListFrameTemplate').text());

    var newDataseFormView = new app.NewDataseFormView();
    newDataseFormView.render();
    app.verticalCenterFront();

    var databases = new app.Databases();

    databases.fetch().done( function () {
      databases.each( function (db) {
        dbInListView = new app.DatabaseInListView({
          model: db
        });
        app.view.$el.find('.databaseList').append(dbInListView.render().$el);
      });
      app.verticalCenterFront();

    });
  }
});
