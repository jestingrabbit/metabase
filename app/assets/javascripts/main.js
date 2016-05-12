var app = app || {};

var ENTER_KEY = 13;

app.verticalCenterFront = function () {
  var frontHeight = $('#front').height();
  var windowHeight = $(window).height();
  $('#front').css({'top': (windowHeight - frontHeight)/2});
}

$(document).ready(function () {
  if (window.location.href.includes("#")) {
    app.router = new app.AppRouter();
    Backbone.history.start();
  }
});
