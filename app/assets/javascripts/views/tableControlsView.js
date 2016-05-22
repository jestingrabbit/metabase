var app = app || {};

app.TableControlsView = Backbone.View.extend({

  tagName: 'div',
  className: 'tableControlsView',

  events: {
    'click .addColumn': 'addColumn'
    // add a column... maybe other stuff later.
  },

  render: function () {
    this.$el.html($('#tableControlsViewTemplate').text());
    return this;
  },

  addColumn: function () {
    var newColumn = new app.Column({
      rank: this.model.columns.length,
      table_id: this.model.id,
      color: "black"
    }, {
      table: this.model
    });
    this.model.columns.add(newColumn);
  }

});
