var RegUserView = Backbone.View.extend({

	events: {
    'submit #reguser' : 'userSignup',
    'submit #logmein' : 'userLogin'
	},

	initialize: function () {
		this.render();
	},

	render: function () {
		var template = Handlebars.compile($('#story_user').text());
		var rendered = template();
		$('.loggedinActions').hide();
		$('.mothercontainer').hide();
		$('.storyfeed').hide();
		$('.background-one').hide();
		$('.userfeed').hide();
		this.$el.html(rendered);
	},

userSignup: function (event) {
	event.preventDefault();
	var user,
			form = $(event.target),
			user_name = form.find('input[name="email"]').val(),
			user_password = form.find('input[name="password"]').val(),
			user_password2 = form.find('input[name="password2"]').val();

		if (user_password !== user_password2) return alert('Passwords do not match!');
		user = new Parse.User({
			username: user_name,
			password: user_password
		});

		user.signUp(null, {
		  success: function(user) {
		    alert('Create a masterpiece ' + user.get('username') + '!');
				App.currentUser = Parse.User.current();
				App.router.navigate('', {trigger: true});
		  },
		  error: function(user, error) {
		    alert("Error: " + error.message);
				form.trigger('reset');
		  }
	});
},

	userLogin: function (event) {
		event.preventDefault();
		var form = $(event.target),
				user_name = form.find('input[name="email"]').val(),
				user_password = form.find('input[name="password"]').val();

		Parse.User.logIn(user_name, user_password, {
		  success: function(user) {
		    alert('Welcome Back ' + user.get('username') + '!');
				App.currentUser = Parse.User.current();
				App.router.navigate('', {trigger: true});
				$('.loggedinActions').show();
				$('.usermain').hide();
				$('.mothercontainer').show();
				$('.storyfeed').show();
				$('.background-one').show();
				$('.userfeed').show();
		  },
		  error: function(user, error) {
		    alert("Error: " + error.message);
				form.trigger('reset');
		  }
		});
	}

});
