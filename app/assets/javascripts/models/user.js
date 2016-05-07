var app = app || {};

app.User = Backbone.Model.extend({
  defaults: {
    name: "User McUser-face",
    email: "yeah@ivegot.email",
    password: "",
    password_confirmation: ""
    // databases
  },
  urlRoot: "/users"
});
