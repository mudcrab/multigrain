window.Multigrain = window.Multigrain || {};

(function() {
	Multigrain.ChannelModel = Backbone.Model.extend({
		// 
	});

	Multigrain.ChannelCollection = Backbone.Collection.extend({
		model: Multigrain.ChannelModel
	});
})();