app = app || {};

app.DatabaseInListView = Backbone.View.extend({

  tagName: 'div',

  events: {
    'click .dbName': 'goToDatabase'
  },

  initialize: function (options) {
    this.model = options.model;
  },

  render: function () {
    var template = _.template($('#databaseInListTemplate').text());
    this.$el.html(template(this.model.attributes));
    return this;
  },

  goToDatabase: function () {
    app.database = this.model;
    app.router.navigate(this.model.get('name') + '/' + this.model.id, {trigger: true});
  }

});
