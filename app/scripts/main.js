// Initialize Parse
Parse.initialize("64WwNmhNlBh5Ypd8ceAVygiRdOCt4h6KSAyVdlAv", "w4wJYyLNzLAgkIAWcFYFfgcSmbtRzB5I5TnoQhyC");

// Initialize App & Checking Users
var App = {};
App.currentUser = Parse.User.current();

// Managing App Views
App.View = function (){
  this.showView = function(view) {
    if (this.currentView){
      this.currentView.remove();
    }
    this.currentView = view;
    this.currentView.render();
    $(".story_cont").html(this.currentView.el);
  }
}

// Simple Script to update the userfield
var showUser = function (user) {
  var name = user.get('username');
  $('.userfield').text(name);
};

// Fireup the App
App.router = new StoryRouter();
Backbone.history.start();


$('#createpost').on('submit', function (event) {

  event.preventDefault();

  // Creates an instance (entry in my DB) of a whiskey model
  var temp_story = new Story();

  // Set Properties
  var validate = temp_story.set({
    name: $('.blog_title').val(),
    description: $('.postform').val(),
    user: App.currentUser
  }, {validate:true});

  // Save your Parse Object
  if(validate !== false) {
    temp_whiskey.setACL(new Parse.ACL(Parse.User.current()));
    temp_whiskey.save(null, {
      success: function(temp_story) {
        // Adds to my collection
        App.story_list.add(temp_story);
        $(this).trigger('reset');
      }
    });
  } else {
    alert('You must fill out both fields!');
  }

});
// Logout
$('.logout button').on('click', function () {
  Parse.User.logOut();
  App.currentUser = Parse.User.current();
  App.router.navigate('user', {trigger: true});
});
