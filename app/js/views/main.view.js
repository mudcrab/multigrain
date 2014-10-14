window.Multigrain = window.Multigrain || {};

(function($) {
	'use strict';
	Multigrain.MainView = Backbone.View.extend({
		initialize: function()
		{
			Multigrain.Socket = new MultigrainSocket(Multigrain.Events, '192.168.12.106', 1337);
			Multigrain.Socket.connect();

			$.cookie('authenticated', false);
			$.cookie('username', null);
			$.cookie('uid', null);

			var loginView = new Multigrain.LoginView();
			$('body').append(loginView.render());
		}
	});
})(jQuery);