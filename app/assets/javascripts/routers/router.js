var app = app || {};

app.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'entrance',
    'loginOrSignUp' : 'showLoginOrSignUP',
    'databases' : 'showDatabases',
    ':dbName/:id' : 'showDatabase'
  },

  initialize: function () {
    app.nav = new app.NavView();
  },

  entrance: function () {
    if (!app.currentUser) {
      $.get('/login').done( function (data) {
        if (data) {
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
      app.router.navigate('', {trigger: true});
    }
  },

  showDatabase: function (dbName, id) {
    if (!app.currentUser) { // get the currentUser without changing nav if its there.
      $.get('/login').done( function (data) {
        if (data) {
          app.currentUser = new app.User(data.user);
          app.router.showDatabase(dbName, id);
        } else {
          delete app.currentUser;
          app.router.navigate('loginOrSignUp', {trigger: true});
        }
      });
      return;
    }
    app.nav.render('database');
    $.get('/databases/'+ id + '/full') // get all the data you need for the view
      .done( function (data) {
        app.database = new app.Database(data.database);
        if (app.currentUser.id !== app.database.get('user_id')){
          app.router.navigate('databases', true);
          return
        }
        app.tablesData = data.tables;
        app.view = new app.DatabaseView();
        app.view.render();
      }).fail( function () {
        console.log("that's not good fellas");
        app.router.navigate('', true);
      });
  }
});
