window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

(function($) {
	Multigrain.View.JoinDialog = Multigrain.View.Dialog.extend({

		id: 'join-dialog',
		className: 'dialog',
		template: Tpl.joinchannel,

		events: {
			'click .close, .cancel': 'close',
			'click .confirm': 'joinChannel'
		},

		initialize: function(options) 
		{
			// 
		},

		joinChannel: function()
		{
			Multigrain.Socket.joinChannel(this.$el.find('select').val(), this.$el.find('input').val());
			this.remove();
		},

		close: function()
		{
			this.remove();
		},

		render: function() 
		{
			var self = this;
			this.$el.html(this.bodyTemplate({ 
				title: 'Join channel',
				cancel_text: 'Cancel',
				confirm_text: 'Confirm'
			}));

			this.$el.find('.dialog-content').html(this.template);

			Multigrain.App.ui.servers.forEach(function(server) {
				var option = $('<option />', {
					text: server
				});

				self.$el.find('select').append(option);
			});
			return this;
		}

	});
})(jQuery);