window.Multigrain = window.Multigrain || {};

(function($) {
	Multigrain.ChatView = Backbone.View.extend({

		el: MG.templates.chat,
		model: new Multigrain.ChatModel({
			channel: 'N/A',
			nick: 'M/A'
		}),
		channelsClx: new Multigrain.ChannelCollection(),

		events: {
			'click .close-channel': 'partChannel'
		},

		initialize: function()
		{
			var self = this;
			this.render();

			this.model.on('change:channel', function(model, channel) {
				$('#channel').text(channel)
			});

			this.model.on('change:nick', function(model, nick) {
				$('#nick').text(nick);
			});

			this.channelsClx.on('add', function(channel) {
				$('.srv-' + channel.get('server') + ' .channels')
				.append(MG.templates.channel.html(channel.attributes));
			});

			this.channelsClx.on('remove', function(channel) {
				// 
			});

			Multigrain.Events.on('socket.irc.servers', function(data) {
				data.forEach(function(srv) {
					if( $('.srv-' + srv).length === 0 )
					{
						$('#servers .cinder-pane-content')
						.append(MG.templates.server.html({ name: srv }));
					}
				});
			});

			Multigrain.Events.on('socket.irc.channels', function(data) {
				var channels = [];
				data.channels.forEach(function(chan) {
					if($('.chn-' + chan).length === 0)
					{
						// channels.push( MG.templates.channel.html({ name: chan, server: data.serverName }) );
						self.channelsClx.add({
							name: chan,
							server: data.serverName
						}, { merge: true });
					}
				});
				// $('.srv-' + data.serverName + ' .channels').append(channels.join(''));
			});
		},

		render: function()
		{
			var self = this;

			$('body').append(MG.templates.servers.html());
			$('#main-container').html(this.el.html(this.model.attributes));
		},

		partChannel: function(e)
		{
			console.log(e);
		}
	});

	Multigrain.ChannelItemView = Backbone.View.extend({
		el: MG.templates.channel,
		model: {},

		initialize: function(model)
		{
			this.model = model;
		},

		render: function()
		{
			this.$el.html(this.el.html( this.model ));
		}
	});
})(jQuery);
