var app = app || {};

app.Table = Backbone.Model.extend({
  defaults: {
    singular: "Table McTable-face",
    plural: ""
    // columns
  },

  urlRoot: function () {
    return "/databases/" + this.database.id + "/tables";
  },

  initialize: function (attributes, options) {
    this.database = options.database;
    this.columns = new app.Columns(null, {table: this});
    this.set(attributes);
  }
});
