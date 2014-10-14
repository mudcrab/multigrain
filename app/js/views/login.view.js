window.Multigrain = window.Multigrain || {};

(function($) {
	'use strict';

	Multigrain.LoginView = Backbone.View.extend({

		events: {
			'click #login': 'handleLogin'
		},

		initialize: function()
		{
			var self = this;

			Multigrain.Events.on('socket.error', function(ev) {
				$('#server-status').removeClass('ok').addClass('err').find('.txt').text('Connection error');
			});

			Multigrain.Events.on('socket.connected', function() {
				$('#server-status').removeClass('err').addClass('ok').find('.txt').text('Server connected');
			});

			Multigrain.Events.on('socket.raw.message', function(data) {
				console.log(data, JSON.stringify(data));
			});

			setTimeout(function() {
				self.handleLogin();
			}, 100);
		},

		render: function()
		{
			this.$el.html(MG.templates.login.html());
			return this.$el;
		},

		handleLogin: function()
		{
			Multigrain.Socket.auth($('#u').val(), $('#pw').val());

			Multigrain.Events.on('socket.auth', function(data) {
				if(data.status)
				{
					$.cookie('authenticated', true);
					$.cookie('username', 'jevgeni@pitfire.eu');
					$.cookie('uid', 1234);

					$('#login-dialog').addClass('closed');

					new Multigrain.ChatView();
				}
				else
				{
					$('#login-msg').text('Authentication error.').fadeIn();
				}
			});
		}
	});
})(jQuery);