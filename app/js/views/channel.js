window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

(function($) {
	Multigrain.View.Channel = Backbone.View.extend({

		tagName: 'li',
		className: 'channel cf',
		template: Tpl.channel,

		events: {
			'click': 'switchChannel',
			'click .channel-close': 'partChannel'
		},

		initialize: function(options) 
		{
			this.$el.data('channelid', this.model.get('server') + '_' + this.model.get('name').replace('#', ''));
			this.listenTo(this.model, 'change', this.update);
		},

		switchChannel: function(e)
		{
			Multigrain.App.ChannelInfo.set('channel', this.model.get('name'));
			Multigrain.Socket.getServerNicks(this.model.get('server'), this.model.get('name'));
			Multigrain.App.ui.active = {
				channel: this.model.get('name'),
				server: this.model.get('server')
			};

			Multigrain.App.Chat.loadMessages(this.model.get('server'), this.model.get('name'));
			$.cookie('activechannel', Multigrain.Helper.getChannelId(this.model.get('server'), this.model.get('name')));
			Multigrain.Events.emit('app.changeChannel', this.model);
		},

		partChannel: function(e)
		{
			e.stopPropagation();
			var channel = $(e.currentTarget).data();
			Multigrain.Socket.partChannel(channel.server, channel.name);
			var channelModel = Multigrain.App.Channels.findWhere({ name: channel.name, server: channel.server });
			Multigrain.App.Channels.remove(channelModel);
			this.close();
		},

		close: function()
		{
			this.remove();
		},

		render: function() 
		{
			this.$el.empty().append(this.template(this.model.attributes));
			return this;
		}

	});
})(jQuery);