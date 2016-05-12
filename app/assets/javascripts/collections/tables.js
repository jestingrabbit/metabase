var app = app || {};

app.Tables = Backbone.Collection.extend({
  url: function () {
    return '/databases/' + this.database.id + '/tables';
  },

  model: app.Table,

  initialize: function (array, options) {
    this.database = options.database;
    this.add(array);
  }
});
