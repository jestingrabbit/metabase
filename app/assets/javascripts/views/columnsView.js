var app = app || {};

app.ColumnsView = Backbone.View.extend({

  tagName: 'div',
  className: 'columnsView',

  events: {
    // drag to another table for association.
  },

  render: function (options) {

    var self = this;

    this.$el.empty();

    this.model.columns.each( function (column) { // probably want a column view in there.
      if(options && options.blurring && column.isNew()){
        self.model.columns.remove(column);
        column.destroy();
      } else {
        var columnView = new app.ColumnView({model: column});
        self.$el.append(columnView.render().$el);
      }
    });

    this.listenTo(this.model.columns, 'add', this.addEditingColumnView);

    return this;
  },

  addEditingColumnView: function (column) {
    var newColumnView = new app.ColumnView({model: column});
    this.$el.append(newColumnView.render({editing:true}).$el);
  }
});
