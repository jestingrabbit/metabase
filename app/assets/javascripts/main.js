var app = app || {};

$(document).ready(function () {

  if (window.location.href.includes("#")) {
    console.log("hello")

    app.router = new app.AppRouter();
    Backbone.history.start();
  }

});
