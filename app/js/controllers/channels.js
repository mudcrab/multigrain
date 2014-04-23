window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Controllers.Channels = function(settings)
{
	var self = this;
	this.events = {
		'click #show-channels': this.toggleChannels,
		'click .channel-list-item': this.handleChannelSelect
	};

	this.serversList = {};
	this.history = {};
	this.activeChannel = '';
	this.activeServer = '';
	this.activeNick = '';

	Cinder.Controller.call(this, settings, this.events);
	
	$('#multigrain').before(this.render());

	this.channelItem = Multigrain.App.templates.channel;
	this.chatItem = Multigrain.App.templates.chatline;

	this.channelsView = new Cinder.Interface.Pane('channels', {
		width: 300,
		show: true
	});

	this.channels = $('#channel-list');

	$('#multigrain-header').css('background', '#000');

	Multigrain.Events.on('chanlog', function(data) {
		self.history = data;
	});

	Multigrain.Events.on('servers', function(data) {
		self.populateChannels(data);
	});

	Multigrain.Events.on('chanMsg', function(data) {
	    self.addHistoryMessage(data);
	    
	    if(data.to === self.activeChannel)
	    	self.addMessage({ from: data.from, message: data.message });
	});
};

Multigrain.Controllers.Channels.prototype = Object.create(Cinder.Controller.prototype);
Multigrain.Controllers.Channels.prototype.constructor = Cinder.Controller;

Multigrain.Controllers.Channels.prototype.toggleChannels = function()
{
	this.channelsView.toggle();
	if(this.channelsView.getPaneInfo().visible)
		$('#multigrain-header').css('background', '#000');
	else
		$('#multigrain-header').css('background', '#212121');
};

Multigrain.Controllers.Channels.prototype.addChannel = function(channelData)
{
	this.channels.append(this.channelItem(channelData));
};

Multigrain.Controllers.Channels.prototype.handleChannelSelect = function(e)
{
	var el = $(e.currentTarget);
	
	this.switchChannel(el.data().server, el.data().channel);
};

Multigrain.Controllers.Channels.prototype.switchChannel = function(server, channel)
{
	var self = this;
	if(channel !== this.activeChannel)
	{
		var item = this.history[server][channel];

		this.activeServer = server;
		this.activeChannel = channel;
		this.activeNick = this.serversList[server].nick;

		$('#multigrain-chat').empty();

		$('#channel-name').text(channel);
		$('#channel-message').text(item.message);

		item.history.forEach(function(history) {
			self.addMessage(history);
		});
	}
	return channel;
};

Multigrain.Controllers.Channels.prototype.populateChannels = function(list)
{
	var self = this;
	this.serversList = list;

	for(var server in this.serversList)
	{
		if(this.serversList.hasOwnProperty(server))
		{

			this.serversList[server].channels.forEach(function(channel) {
				self.addChannel({
					channel: channel,
					server: server
				});
			});

		}
	}

	try
	{
		var firstServer = Object.keys(this.serversList)[0];
		this.switchChannel(firstServer, this.serversList[firstServer].channels[0])
	}
	catch(e) {}
};

Multigrain.Controllers.Channels.prototype.addMessage = function(history)
{
    var self = this;
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
        time: new Date().toTimeString().split(' ')[0]
    };
    $('#multigrain-chat').append(self.chatItem(chatline));
	$('#multigrain-chat-holder').scrollTop( $('#multigrain-chat').height() );
};

Multigrain.Controllers.Channels.prototype.addHistoryMessage = function(data)
{
	try
	{
		this.history[data.server][data.to].history.push({ from: data.from, message: data.message });
	}
	catch(e) {}
};