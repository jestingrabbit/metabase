app = app || ap;


app.NavView = Backbone.View.extend({
  el: 'nav',

  events: {
    'click #databaseList': 'redirectToDatabaseList',
  },

  render: function(place) {
    this.$el.empty();

    var navTemplate = _.template($('#navTemplate').text());
    var navStatus = {
      'place': place,
      'currentUser': app.currentUser
    }
    this.$el.html(navTemplate(navStatus));
  },

  redirectToDatabaseList: function () {
    app.router.navigate('databases', true);
  }
});
