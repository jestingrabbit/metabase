var app = app || {};

app.Columns = Backbone.Collection.extend({
  url: function () {
    return '/databases/' + this.database.id + '/tables/' + this.table.id + '/columns';
  },

  model: app.Column,

  initialize: function (array, options) {
    this.table = options.table;
    this.database = this.table.database;
    this.add(array);
  }
});
