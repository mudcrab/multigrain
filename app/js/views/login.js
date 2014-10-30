window.Multigrain = window.Multigrain || {};
window.Multigrain.View = window.Multigrain.View || {};

(function($) {
	Multigrain.View.Login = Backbone.View.extend({

		template: Tpl.login,

		events: {
			'click #login': 'handleLogin'
		},

		initialize: function()
		{
			var self = this;
			Multigrain.Socket = new MultigrainSocket(Multigrain.Events, '192.168.12.106', 1337);
			// Multigrain.Socket = new MultigrainSocket(Multigrain.Events, '127.0.0.1', 1337);
			Multigrain.Socket.connect();

			$.cookie('authenticated', false);
			$.cookie('username', null);
			$.cookie('uid', null);

			Multigrain.Events.on('socket.error', function(ev) {
				$('#server-status').removeClass('ok').addClass('err').find('.txt').text('Connection error');
			});

			Multigrain.Events.on('socket.connected', function() {
				$('#server-status').removeClass('err').addClass('ok').find('.txt').text('Server connected');
			});

			Multigrain.Log = { raw: [], parsed: [] };
			Multigrain.Events.on('socket.raw.message', function(data) {
				// console.log(data, JSON.stringify(data));
				Multigrain.Log.raw.push(JSON.stringify(data));
				Multigrain.Log.parsed.push(data);
			});

			setTimeout(function() {
				self.handleLogin();
			}, 100);
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

					// new Multigrain.ChatView();
					$.cookie('authenticated', true);
					// setTimeout(function() {
						Multigrain.Router.navigate('/', { trigger: true });
					// }, 300);
				}
				else
				{
					$('#login-msg').text('Authentication error.').fadeIn();
				}
			});
		},

		render: function() 
		{
			this.$el.html(Tpl.login);
		}

	});
})(jQuery);