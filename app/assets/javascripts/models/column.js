var app = app || {};

app.Table = Backbone.Model.extend({
  defaults: {
    singular: "Column McColumn-face"
    // columns
  },

  urlRoot: function () {
    return "/databases/" + this.database.id + "/tables/" + this.table.id +"/columns";
  },

  initialize: function (attributes, options) {
    this.table = options.table;
    this.database = this.table.database;
    this.set(attributes);
  }
});
