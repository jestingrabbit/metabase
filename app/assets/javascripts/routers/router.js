var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'entrance',
    'loginOrSignUp' : 'showLoginOrSignUP',
    'databases' : 'showDatabases'
  },

  entrance: function () {
    if (!app.currentUser) {
      $.get('/login').done( function (data) {
        app.session = data;
        if (data.user) {
          app.currentUser = new app.User(data.user);
          app.router.navigate('databases', {trigger: true});
        } else {
          delete app.currentUser;
          app.router.navigate('loginOrSignUp', {trigger: true});
        }
      });
    }
  },

  showLoginOrSignUP: function () {
    var makeCurrentUserView = new app.MakeCurrentUserView();
    makeCurrentUserView.render();
  }
});
