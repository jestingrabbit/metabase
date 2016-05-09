var app = app || {};

$(document).ready(function () {
  if (window.location.href.includes("#")) {
    app.router = new app.AppRouter();
    Backbone.history.start();
  }
});
