window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

(function($) {
	Multigrain.View.JoinDialog = Multigrain.View.Dialog.extend({

		id: 'join-dialog',
		template: Tpl.joinchannel,

		events: {
			'click .close, .cancel': 'close',
			'click .confirm': 'joinChannel'
		},

		joinChannel: function()
		{
			Multigrain.Socket.joinChannel(this.$el.find('select').val(), this.$el.find('input').val());
			this.remove();
		},

		render: function()
		{
			// this.preRender();
			var self = this;
			
			this.$el.append(this.bodyTemplate({
				title: self.opts.title,
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

			this.$el.addClass('opened');
			return this;
		}

	});
})(jQuery);
