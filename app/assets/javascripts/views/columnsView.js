var app = app || {};

app.ColumnsView = Backbone.View.extend({

  tagName: 'div',
  className: 'columnsView',

  events: {
    // drag to another table for association.
  },

  render: function (options) {
    this.model.columns.each( function (column) { // probably want a column view in there.
      console.log(column);
    });

    this.listenTo(this.model.columns, 'add', this.addEditingColumnView);

    return this;
  },

  addEditingColumnView: function (column) {
    var newColumnView = new app.ColumnView({model: column});
    this.$el.append(newColumnView.render({editing:true}).$el);
  }
});
