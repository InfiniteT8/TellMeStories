// This is a view of all of my storys
var StoryListView = Backbone.View.extend ({

  events: {
    'click .toggle' : 'toggleShort',
    'click .edit' : 'editShort'
  },

  initialize: function () {
    var self = this;
    App.story_list = new StoryCollection();
    App.story_list.query = new Parse.Query(Story);
    App.story_list.comparator = function(object) {
      return object.get("read");
    };
    App.story_list.query.equalTo('user', App.currentUser);
    App.story_list.on('change', this.render, this); 
    App.story_list.on('add', this.render, this);
    App.story_list.fetch().done( function () {
      self.render();
    });
  },

  render: function () {
    App.story_list.sort();
    var template = Handlebars.compile($('#story_items').html()); // Targets the handlebar template in the index.html file.
    var rendered = template({ posts: App.story_list.toJSON() }); 
    this.$el.html(rendered); 
  },

  toggleShort: function (event) {
    event.preventDefault(); 
    event.stopPropagation(); 
    var item_clicked = $(event.currentTarget); 
    var post_id = item_clicked.attr('id'); 
    var post = App.story_list.get(post_id); 
    var read = post.get('read');

    
    if (read) {
      post.set({ tried: false }).save();
    } else {
      post.set({ tried: true }).save();
    }
  },

  editShort: function (event) {
    event.preventDefault();
    event.stopPropagation();
    var post_id = $(event.target).attr('id');
    App.router.navigate('#edit/'+post_id, {trigger: true});
  }

});
