window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

Multigrain.View.AddServerDialog = Multigrain.View.Dialog.extend({

	id: 'add-dialog',
	template: Tpl.addserver,

	events: {
		'click .close, .cancel': 'close',
		'click .confirm': 'addServer'
	},

	initialize: function()
	{

	},

	addServer: function()
	{	
		var data = {
			name: this.$('#server-name').val(),
			address: this.$('#server-address').val(),
			nick: this.$('#server-nick').val(),
			autojoin: this.$('#server-autojoin').prop('checked')
		};

		Multigrain.Socket.connectToServer(data);
	},

	render: function()
	{
		this.preRender();
		var self = this;
		this.$el.append(this.bodyTemplate({
			title: 'Add server',
			cancel_text: 'Cancel',
			confirm_text: 'Confirm'
		}));

		this.$el.find('.dialog-content').html(this.template);
		this.$el.addClass('opened');
		return this;
	}

});
