var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'entrance',
    'loginOrSignUp' : 'showLoginOrSignUP',
    'databases' : 'showDatabases'
  },

  initialize: function () {
    app.nav = new app.NavView();
  },

  entrance: function () {
    if (!app.currentUser) {
      $.get('/login').done( function (data) {
        if (data) {
          app.currentUser = new app.User(data);
          app.router.navigate('databases', {trigger: true});
        } else {
          delete app.currentUser;
          app.router.navigate('loginOrSignUp', {trigger: true});
        }
      });
    }
  },

  showLoginOrSignUP: function () {
    app.nav.render('login');
    var makeCurrentUserView = new app.MakeCurrentUserView();
    makeCurrentUserView.render();
  },

  showDatabases: function () {
    app.nav.render('databaseList');
    if(app.currentUser){
      var databaseListView = new app.DatabaseListView();
      databaseListView.render();
    } else {
      this.entrance();
    }
  }
});
