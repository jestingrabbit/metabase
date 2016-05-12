var app = app || {};

app.Database = Backbone.Model.extend({
  defaults: {
    name: "Database McDatabase-face",
    // tables
    color_index: 0
  },
  urlRoot: "/databases",

  initialize: function (attributes, options) {
    this.tables = new app.Tables(null, {database: this});
    this.set(attributes);
  }
});
