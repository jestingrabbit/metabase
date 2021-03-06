app = app || {};

app.TableView = Backbone.View.extend({

  tagName: 'div',
  className: 'tableView',

  events: {
    'mousedown': 'focusHere'
    // button click events galore
  },

  render: function (options) {

    var self = this;
    this.$el.empty();

    // this.$el.html($('#tableViewTemplate').text()); nah, do it with subviews.

    if (this.model.get('database_id') === undefined) { // new table, lot of table value initialization.
      this.model.set('database_id', app.database.id);

      var tableColor = app.rainbow.get();
      app.colors.push(tableColor);
      this.model.set('color', tableColor);
      app.database.set('color_index', app.colors.length);
      app.database.save();

      var tableNameView = new app.TableNameView({model: this.model});
      this.$el.append(tableNameView.render({editing:true}).$el);
      app.view.getWindowDimensions();

      setTimeout( function () {
        var top = (app.mainHeight - self.$el.height())/2;
        var left = (app.mainWidth - self.$el.width())/2;
        self.model.set({
          'top': top,
          'left': left
        });
        self.$el.css({
          'top': top + "px",
          'left': left + "px"
        });
      }, 16);
    } else {
      var tableNameView = new app.TableNameView({model: this.model});
      this.$el.append(tableNameView.render().$el);
      this.$el.css({
        'top': this.model.get('top') + "px",
        'left': this.model.get('left') + "px"
      });

      // make the columns...
      this.columnsView = new app.ColumnsView({model: this.model});
      this.$el.append(this.columnsView.render(options).$el);

      // make the controls...
      this.controlsView = new app.TableControlsView({model: this.model});
      this.$el.append(this.controlsView.render().$el);

    }

    this.$el.css({
      'color': 'white',
      'background-color': this.model.get('color'),
      'border-color': this.model.get('color')
    })

    return this;
  },

  focusHere: function () {
    if(app.table && this.model !== app.table){
      app.table.view.blur();
    }
    app.table = this.model;
    this.$el.css({'z-index': 1})
  },

  blur: function () {
    if(this.model.isNew()){
      this.$el.remove();
      this.model.destroy();
    } else {
      this.$el.css({'z-index': 0});
      this.render({blurring: true});
    }
  }
});
