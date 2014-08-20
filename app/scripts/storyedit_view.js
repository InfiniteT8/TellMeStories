// This is my edit view
// This allows me to edit a Whiskey and delete it
var StoryEditView = Backbone.View.extend({

  events: {
    'submit #updateForm' : 'updateStory',
    'click .delete' : 'deleteStory'
  },

  initialize: function (attrs) {
    this.story = App.story_list.get(attrs.postid);
    this.render();
  },

  render: function () {
    var template = Handlebars.compile($('#short_single').html());
    var rendered = template(this.story.toJSON());
    this.$el.prev().html('');
    this.$el.html(rendered);
    // this.$el.html(rendered);
  },

  updateStory: function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.story.set({ // and again :)
      name: $('.edit_story_name').val(),
      description: $('.edit_story_desc').val()
    });
    this.story.save();
    App.router.navigate("", { trigger: true });
  },

  deleteStory: function (event) {
    event.preventDefault();
    event.stopPropagation();
    // Standard JS confirm dialogue
    if (window.confirm("Are you sure?")) {
      this.story.destroy({success: function () { 
        App.router.navigate("", { trigger: true }); // E.T. Phone Home (route me home)
      }});
    }
  }

});
