window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

(function($) {
	Multigrain.View.ChatInput = Backbone.View.extend({

		template: Tpl.chatinput,
		tagName: 'section',
		id: 'chat-input-holder',
		className: 'container',

		events: {
			'keyup #input': 'sendMessage'
		},

		initialize: function(options) 
		{
			var self = this;

			Multigrain.Events.on('app.changeChannel', function(model) {
				self.$('#username').text(model.get('nick'));
			});
		},

		sendMessage: function(e)
		{
			if(e.keyCode === 13)
			{
				Multigrain.Socket.say(
					Multigrain.App.ui.active.server,
					Multigrain.App.ui.active.channel,
					this.$(e.currentTarget).val()
				);
				this.$(e.currentTarget).val('');
			}
		},

		render: function() 
		{
			this.$el.empty().append(this.template({ username: 'kvhhr' }));
			return this;
		}

	});
})(jQuery);