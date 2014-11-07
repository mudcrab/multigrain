window.Multigrain.App = window.Multigrain.App || { ui: {} };
(function() {
	'use strict';

	var Router = Backbone.Router.extend({

		initialize: function()
		{
			Multigrain.Events = new Events();
		},

		routes:
		{
			'': 'index',
			'login': 'login'
		},

		index: function()
		{
			if($.cookie('authenticated') === 'true')
			{
				Multigrain.App.Main = Multigrain.App.Main || new Multigrain.View.Main({
					el: 'body'
				});
				Multigrain.App.Main.render();
				// $('#main').html(Multigrain.App.Main.render().el);
			}
			else
			{
				this.navigate('/login', { trigger: true });
			}
		},

		login: function()
		{
			Multigrain.App.Login = Multigrain.App.Login || new Multigrain.View.Login({
				el: '#main'
			});
			Multigrain.App.Login.render();
		}
	});

	Multigrain.Router = new Router();
	Backbone.history.start();
})();
