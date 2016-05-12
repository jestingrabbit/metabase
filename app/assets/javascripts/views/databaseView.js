app = app || {};

app.DatabaseView = Backbone.View.extend({

  el: '#main',

  events: {
    'click': 'hello'
//    'click button#newTable': 'makeNewTable' doesn't work here pally, makes more sense is a subview anyway??
  },

  render: function (){
    $('#front').empty();
    this.$el.append($('<svg/>').css({'height': '100vh', 'width': '100vw'}));
    this.$el.append(
      $('<div/>')
        .addClass('bottom-left')
        .addClass('dbName')
        .append($('<h3/>').text(app.database.get('name')))
    );

    this.$el.append(
      $('<div/>')
        .addClass('bottom-right')
        .addClass('controls')
        .html($('#databaseViewControlsTemplate').text())
    );

    app.controlsView = new app.ControlsView(); // listens to buttons once they're made

    app.mainHeight = this.$el.height();
    app.mainWidth = this.$el.width();

    this.colorSetup();

    this.listenTo(app.database.tables, 'add', this.addTableView);

    _.each(app.tablesData, function(tableAndColumns){
      var tableAttrs = tableAndColumns.table;
      var table = new app.Table(tableAttrs, {database: app.database});
      var columnsAttrs = tableAndColumns.columns;
      var columns = _.map(columnsAttrs, function (cAs) {
        return new app.Column(cAs, {'table': table})
      });
      table.columns.add(columns);
      app.database.tables.add(table);
    });
  },

  addTableView: function (table) {
    table.view = new app.TableView({model: table});
    app.view.$el.append(table.view.render().$el);
  },

  colorSetup: function () {
    app.rainbow = new rainbow.Colors({fraction: 0.5});
    app.colors = [];
    while (app.database.color_index > app.colors.length) {
      app.color.push(app.rainbow.get());
    }
  }
});
