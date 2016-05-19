var app = app || {};

app.Column = Backbone.Model.extend({
  defaults: {
    name: ""
    // columns
  },

  urlRoot: function () {
    return "/databases/" + this.database.id + "/tables/" + this.table.id +"/columns";
  },

  initialize: function (attributes, options) {
    this.set(attributes);
    this.table = options.table;
    this.database = this.table.database;
  }
});
