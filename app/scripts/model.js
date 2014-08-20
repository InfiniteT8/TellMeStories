var Story = Parse.Object.extend({

  className: 'Short',

  // Set up some validation
  validate: function (attrs) {
    if (!attrs.name) {
      return 'Please enter a Story Name!';
    }
    if(!attrs.description){
      return 'Please write me a story!';
    }
  },

  //registers to the database being used.
  idAttribute: 'objectId',

  defaults: {
    name: '',
    description: '',
    read: false
  }
  //defines backbone model

});
  var StoryCollection = Parse.Collection.extend ({
    model: Story
  }); 
