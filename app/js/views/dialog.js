window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

(function($) {
	Multigrain.View.Dialog = Backbone.View.extend({
		tagName: 'section',
		className: 'dialog',

		bodyTemplate: Tpl.dialog,

		events: {},

		initialize: function(options) 
		{
			// 
		}

	});
})(jQuery);