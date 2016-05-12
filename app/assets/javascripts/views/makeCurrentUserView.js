var app = app || {};

app.MakeCurrentUserView = Backbone.View.extend({
  el: '#front',

  events: {
    'click #signUpButton': 'makeNewUser',
    'click #loginButton': 'makeNewSession',
    'click fieldset': 'focusOnInput'
  },

  render: function () {
    app.view = this;
    this.$el.html($('#makeCurrentUserTemplate').text());
    app.verticalCenterFront();

    var frontHeight = $('#front').height();
    var loginHeight = $('#login').height();
    $('#login').css({'top': (frontHeight - loginHeight)/2});
    var orHeight = $('#or').height();
    $('#or').css({'top': (frontHeight - orHeight)/2});
  },


  // The below is from the logs of a functional rails project (askterix (aka interroboard))
  // Note the authenticity_token.

  // Started POST "/users" for ::1 at 2016-05-07 21:22:45 +1000
  // Processing by UsersController#create as HTML
  //   Parameters: {"utf8"=>"✓", "authenticity_token"=>"n6Ih5V0XQN8D7j+QU2BS/9Nt6NXz6ufPgU75CC0jMKC+pTe43O9z2mGpk7bFN0sd04mUz47vP9pjdfg3siNH6A==", "user"=>{"name"=>"jr", "email"=>"jr@ga.co", "password"=>"[FILTERED]", "password_confirmation"=>"[FILTERED]"}, "commit"=>"Join us"}

  // Its likely these are completely superfluous. Session cookies are being sent hither and yon with every contact.

  makeNewUser: function () {
    if (!$('#signUpButton').hasClass('disabled')){
      $('#signUpButton').addClass('disabled');
      var keys = ["name", "email", "password", "password_confirmation"]
      var user = {};
      _.each(keys, function (key){
        user[key] = $('form.new_user fieldset.' + key + ' input').val();
      });
      $.post('/users', { "user": user}) // no auth token, but I'm sending the cookie, so... its okay?

        .fail( function (resp) {
          app.view.$el.find('fieldset').removeClass('error');
          app.view.$el.find('div.message').empty();

          var errors = JSON.parse(resp.responseText);
          _.each(errors, function(value, key) { // will crap out on an error on base.
            var $fieldset = app.view.$el.find('form.new_user fieldset.' + key);
            $fieldset.addClass('error');
            $fieldset.find('div.message').text(value.join(', '));
          });

          app.view.$el.find('#signup .error input')[0].focus();
          $('#signUpButton').removeClass('disabled');
        })
        .success( function (data) {
          app.currentUser = new app.User(data);
          app.router.navigate('databases', {trigger: true});
        });
    }
  },

  makeNewSession: function () {
    console.log("hello")
    if (!$('#loginButton').hasClass('disabled')){
      $('#loginButton').addClass('disabled');
      var keys = ["identifier", "password"]
      var object = {};
      _.each(keys, function (key){
        object[key] = $('form.returning fieldset.' + key + ' input').val();
      });
      $.post('/login', object) // no auth token, but I'm sending the cookie, so... its okay?
        .fail( function () {
          app.view.$el.find('fieldset').removeClass('error');
          app.view.$el.find('div.message').empty();

          app.view.$el.find('#login .returning div.top-message').text('Invalid ID or password');

          app.view.$el.find('#login input')[0].focus();
          $('#loginButton').removeClass('disabled');
        })
        .success( function (data) {
          app.currentUser = new app.User(data);
          app.router.navigate('databases', {trigger: true});
        });
    }
  },

  focusOnInput: function (e) {
    $(arguments[0].currentTarget).find('input').focus();
  }


});
