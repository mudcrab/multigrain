window.Multigrain = window.Multigrain || {};
Multigrain.Model = Multigrain.Model || {};

(function($) {
	Multigrain.Model.Channel = Backbone.Model.extend({

		defaults: {
			name: '',
			server: '',
			nick: '',
			nicks: {}
		},

		initialize: function(options) 
		{
			// 
		}

	});
	
	Multigrain.Model.Channels = Backbone.Collection.extend({

		model: Multigrain.Model.Channel,

		initialize: function(options) 
		{
			// 
		}

	});
})();

	