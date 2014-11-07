window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

(function($) {
	Multigrain.View.Chat = Backbone.View.extend({

		template: Tpl.chat,
		tagName: 'ul',
		id: 'chat',
		className: 'container',
		chats: {},

		events: {},

		initialize: function(options) 
		{
			var self = this;

			Multigrain.Events.on('socket.irc.message', function(data) {
				self.addMessage(data.server, data.to, data.from, data.message);
			});

			Multigrain.Events.on('socket.irc.pm', function(data) {
				self.addMessage(data.server, data.nick, data.nick, data.text);
			});
		},

		addMessage: function(server, channel, from, message)
		{
			var cId = Multigrain.Helper.getChannelId(server, channel);
			var date = new Date();

			this.chats[cId] = this.chats[cId] || [];

			var i = this.chats[cId].push({
				from: from,
				message: message,
				time: date.getHours() + ':' + date.getMinutes()
			});

			if(Multigrain.App.ui.active.channel == channel && Multigrain.App.ui.active.server == server)
			{
				this.$el.append(this.template(this.chats[cId][i-1]));
				this.$el.scrollTop(this.$el[0].scrollHeight);
			}
		},

		loadMessages: function(server, channel, server_id, channel_id)
		{
			var self = this;
			var cId = Multigrain.Helper.getChannelId(server, channel);
			this.$el.empty();

			if(typeof this.chats[cId] !== 'undefined')
			{
				this.chats[cId].forEach(function(line) {
					self.$el.append(self.template(line));
				});

				this.$el.scrollTop(this.$el[0].scrollHeight);
			} else {
				var url = [
					Multigrain.Config.API_URL,
					'messages',
					server_id,
					channel_id,
					100,
					Multigrain.Config.AUTH_HASH
				];

				$.get(url.join('/'), function(response) {
					self.chats[cId] = [];

					response.data.forEach(function(line) {
						var date = new Date(line.date);
						self.chats[cId].push({
							from: line.from,
							message: line.message,
							time: date.getHours() + ':' + date.getMinutes()
						});
					});

					self.loadMessages(server, channel, server_id, channel_id);
				});
			}
		},

		render: function() 
		{
			this.$el.empty();
			return this;
		}

	});
})(jQuery);