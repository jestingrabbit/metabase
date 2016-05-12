var app = app || {};

app.Databases = Backbone.Collection.extend({
  url: '/databases',
  model: app.Database
});
