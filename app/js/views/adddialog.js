window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

Multigrain.View.AddServerDialog = Multigrain.View.Dialog.extend({

	id: 'add-dialog',
	className: 'dialog',
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

	},

	render: function()
	{
		var self = this;
		this.$el.html(this.bodyTemplate({
			title: 'Add server',
			cancel_text: 'Cancel',
			confirm_text: 'Confirm'
		}));

		this.$el.find('.dialog-content').html(this.template);
		return this;
	}

});
