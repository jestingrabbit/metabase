app = app || {};

app.TableView = Backbone.View.extend({

  tagName: 'div',
  className: 'tableView',

  events: {
    // button click events galore
  },

  render: function () {

    // this.$el.html($('#tableViewTemplate').text()); nah, do it with subviews.

    if (this.model.get('database_id') === undefined) { // lot of table value initialization and stuff.
      this.model.set('database_id', app.database.id);

      var tableColor = app.rainbow.get();
      app.colors.push(tableColor);
      this.model.set('color', tableColor);
      app.database.set('color_index', app.colors.length);

      var tableNameView = new app.TableNameView({model: this.model});
      this.$el.append(tableNameView.render({editing:true}).$el);

      var top = (app.mainHeight - this.$el.height())/2;
      var left = (app.mainWidth - this.$el.width())/2;
      this.model.set({
        'top': top,
        'left': left
      });
      this.$el.css({
        'top': top + "px",
        'left': left + "px"
      });
    }

    this.$el.css({
      'color': this.model.get('color'),
      'border-color': this.model.get('color')
    })

    return this;
  }
})
