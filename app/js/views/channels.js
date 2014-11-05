window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

(function($) {
	Multigrain.View.Channels = Backbone.View.extend({

		template: '',
		tagName: 'ul',
		id: 'channels',
		channels: {},

		events: {},

		initialize: function(options) 
		{
			var self = this;
			Multigrain.App.Channels = new Multigrain.Model.Channels();
			this.listenTo(Multigrain.App.Channels, 'add', this.addChannel);
			Multigrain.Events.on('socket.irc.channels', function(data) {
				data.channels.forEach(function(chan) {
					if( typeof Multigrain.App.Channels.findWhere({ name: chan.channel, server: data.serverName }) === 'undefined' )
					{
						Multigrain.App.Channels.add({ 
							name: chan.channel,
							nick: chan.nick,
							server: data.serverName 
						});
					}
				});

				self.render();
			});

			Multigrain.Events.on('socket.irc.names', function(data) {
				var channel = Multigrain.App.Channels.findWhere({ name: data.channel, server: data.server });
				channel.set('nicks', data.nicks);
			});

			Multigrain.Events.on('socket.irc.pm', function(data) {
				if( typeof Multigrain.App.Channels.findWhere({ name: data.nick, server: data.server }) === 'undefined' )
				{
					Multigrain.App.Channels.add({ name: data.nick, server: data.server });
				}
			});
		},

		addChannel: function(model)
		{
			var chan = new Multigrain.View.Channel({ model: model });
			this.$el.append(chan.render().el);
		},

		render: function() 
		{
			var self = this;

			this.$el.empty();

			Multigrain.App.Channels.each(function(Channel) {
				var chan = new Multigrain.View.Channel({ model: Channel });
				self.$el.append(chan.render().el);
				var cId = Multigrain.Helper.getChannelId(Channel.get('server'), Channel.get('name'));
				if(cId == $.cookie('activechannel'))
				{
					chan.switchChannel();
				}
			});

			if(typeof Multigrain.App.Channels.at(0) !== 'undefined')
			{
				Multigrain.App.ui.active = Multigrain.App.ui.active || {
					channel: Multigrain.App.Channels.at(0).get('name'),
					server: Multigrain.App.Channels.at(0).get('server')
				};
			}

			return this;
		}

	});
})(jQuery);