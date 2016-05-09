var app = app || {};

app.User = Backbone.Model.extend({
  defaults: {
    name: "User McUser-face",
    email: "yeah@ivegot.email"
    // databases
  },
  urlRoot: "/users"
});
