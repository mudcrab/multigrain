window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

(function($) {
	Multigrain.View.Dialog = Backbone.View.extend({
		tagName: 'section',
		className: 'dialog',

		bodyTemplate: Tpl.dialog,

		events: {
			'click .close, .cancel': 'close',
		},

		close: function()
		{
			this.remove();
		}

	});
})(jQuery);
