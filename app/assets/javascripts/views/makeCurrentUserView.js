var app = app || {};

app.MakeCurrentUserView = Backbone.View.extend({
  el: '#front',

  events: {
    'click #signUpButton': 'makeNewUser'
  },

  render: function () {
    this.$el.html($('#makeCurrentUserTemplate').text());
  },

  // Started POST "/users" for ::1 at 2016-05-07 21:22:45 +1000
  // Processing by UsersController#create as HTML
  //   Parameters: {"utf8"=>"✓", "authenticity_token"=>"n6Ih5V0XQN8D7j+QU2BS/9Nt6NXz6ufPgU75CC0jMKC+pTe43O9z2mGpk7bFN0sd04mUz47vP9pjdfg3siNH6A==", "user"=>{"name"=>"jr", "email"=>"jr@ga.co", "password"=>"[FILTERED]", "password_confirmation"=>"[FILTERED]"}, "commit"=>"Join us"}


  makeNewUser: function () {
    if (!$('#signUpButton').hasClass('clicked')){
      $('#signUpButton').addClass('clicked');
      $.post('/users', {
        utf8:"✓",
        user: {
          name: $('form.new_user input.name').val(),
          email: $('form.new_user input.email').val(),
          password: $('form.new_user input.password').val(),
          password_confirmation: $('form.new_user input.password').val(),
        }
      }).done(function(data){
        app.currentUser = new app.User(data);
        console.log(currentUser);
        app.router.navigate('databases', {trigger: true});
      }).fail(function(){
        console.log(arguments);
      });
    }
  }

});
