window.Multigrain = window.Multigrain || {};
Multigrain.Model = Multigrain.Model || {};

(function($) {
	Multigrain.Model.Channel = Backbone.Model.extend({

		defaults: {
			name: '',
			channel_id: '',
			server: '',
			server_id: '',
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

	