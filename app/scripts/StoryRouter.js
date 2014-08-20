var StoryRouter = Backbone.Router.extend({

   // Defining my Routes
  routes: {
    '' : 'home',
    'edit/:id' : 'edit',
    'user' : 'signInUp'
  },

  initialize: function () {
    this.appView = new App.View();
  },

  // Loads my main list view
  home: function () {
    if(!App.currentUser) return App.router.navigate('user', {trigger: true});
    showUser(App.currentUser);
    var listView = new StoryListView();
    this.appView.showView(listView);
  },

  // My edit screen for the currently active user.
  edit: function (id) {
    if(!App.currentUser) return App.router.navigate('user', {trigger: true});
    showUser(App.currentUser);
    var editView = new StoryEditView({ postid: id });
    this.appView.showView(editView);
  },

  signInUp: function () {
    if(App.currentUser) return App.router.navigate('', {trigger: true});
    var regMeIn = new RegUserView();
    this.appView.showView(regMeIn);
  }

});
