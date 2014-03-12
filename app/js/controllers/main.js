window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Controllers.Main = function(settings)
{
	this.events = {
		'click .channel-list-item': function(e) {
			this.switchChannel($(e.currentTarget).data().server, $(e.currentTarget).data().channel);
		}.bind(this)
		// 'click #channel-select': this.handleConnections,
		// 'click #user-settings': this.addLine,
	};

	this.channels = {};
	this.activeChannel = null;
	this.activeNick = null;

	this.serverNicks = {
		local: 'khvhr',
		freenode: 'kohvihoor'
	};

	var serverChannelList = 
	{
		local: [
			{
				name: '#test',
				message: 'Blah1',
				history: [
					{
						from: 'asdf',
						message: 'alskdjasdkljsa'
					},
					{
						from: 'khvhr',
						message: 'lololol khvhr'
					},
					{
						from: 'asdf',
						message: 'lolololasdadasdas'
					},
					{
						from: 'aaasd123',
						message: 'asdasfasfasdasdas'
					},
					{
						from: 'ksasd',
						message: 'khvhr, kldjsakl'
					}
				]
			}
		],
		freenode: [
			{
				name: '##javascript',
				message: 'Blah2',
				history: []
			},
			{
				name: '#debian',
				message: 'Blah3',
				history: []
			}
		]
	};
	
	this.populateChannels(serverChannelList);

	Cinder.Controller.call(this, settings, this.events);
};
Multigrain.Controllers.Main.prototype = Object.create(Cinder.Controller.prototype);
Multigrain.Controllers.Main.prototype.constructor = Cinder.Controller;

Multigrain.Controllers.Main.prototype.handleConnections = function(e)
{
	e.preventDefault();
	console.log('asd')
	var dialog = new Multigrain.ui.Dialog('blah', 'lol', [{ title: 'Connect', id: 'ok', pos: 'right', click: function() { console.log('blah') } }]);
	dialog.setContent(Multigrain.App.templates.connect);
	dialog.open();
};

Multigrain.Controllers.Main.prototype.addLine = function()
{
	$('#display').append(Multigrain.App.templates.chatline({ type: 'regular', nick: 'blah', msg: 'Some message', timestamp: '00:12' }))
};

Multigrain.Controllers.Main.prototype.render = function()
{
	// $('#dialog-content').html(this.view({ asd: 'tere' }));
};

Multigrain.Controllers.Main.prototype.populateChannels = function(list)
{
	var self = this;
	for(var item in list)
	{
		if(list.hasOwnProperty(item))
		{
			self.channels[item] = self.channels[item] || {};

			list[item].forEach(function(channel) {
				if(typeof self.channels[item][channel.name] == 'undefined')
				{
					self.channels[item][channel.name] = { history: channel.history, message: channel.message };
					self.activeChannel = self.activeChannel || self.switchChannel(item, channel.name);
					var chanItem = {
						channel: channel.name,
						server: item
					};
					$('#channel-list').append(Multigrain.App.templates.channel(chanItem));
				}
			});
		}
	}
};

Multigrain.Controllers.Main.prototype.switchChannel = function(server, channel)
{
	var self = this;
	if(channel !== this.activeChannel)
	{
		var item = this.channels[server][channel];
		$('#channel-name').html(channel);
		$('#channel-message').html(item.message);
		this.activeChannel = channel;
		this.activeNick = this.serverNicks[server];
		this.setNick();

		$('#chatlines').empty();
		item.history.forEach(function(history) {
			var type = null;

			if(history.from == self.activeNick)
				type = 'self';

			var matcher = new RegExp(self.activeNick, 'g');
			if(history.message.match(matcher) != null && history.from != self.activeNick)
				type = 'notice';

			var chatline = {
				type: type,
				author: history.from,
				message: history.message,
				time: new Date()
			};
			$('#chatlines').append(Multigrain.App.templates.chatline(chatline));
		});
	}
	return channel;
};

Multigrain.Controllers.Main.prototype.setNick = function()
{
	$('#user').text('@' + this.activeNick);
};