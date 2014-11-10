window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

(function($) {
	Multigrain.View.Dialog = Backbone.View.extend({
		tagName: 'section',
		className: 'dialog-overlay',

		bodyTemplate: Tpl.dialog,
		overlayTemplate: Tpl.dialog_overlay,

		initialize: function(opts)
		{
			this.opts = opts || {
				title: ''
			};
		},

		close: function()
		{
			var self = this;

			this.$el.find('.dialog').addClass('close');

			this.$el.removeClass('opened');
			setTimeout(function() {
				self.remove();
			}, 300);
		},

		preRender: function()
		{
			// this.$el.html(this.overlayTemplate());
		}

	});
})(jQuery);
