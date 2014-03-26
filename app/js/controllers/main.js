window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Controllers.Main = function(settings)
{
    var self = this;
	this.events = {
		'click .channel-list-item': function(e) {
			this.switchChannel($(e.currentTarget).data().server, $(e.currentTarget).data().channel);
		}.bind(this),
        'click #channel-join': this.joinChannel,
        'click #join-chan': this.commitJoin
		// 'click #channel-select': this.handleConnections,
		// 'click #user-settings': this.addLine,
	};

	this.channels = {};
    this.activeServer = 'local';
	this.activeNick = null;

	this.serverNicks = {
		local: 'jk',
		freenode: 'kohvihoor'
	};

	Multigrain.Events.on('chanlog', function(data) {
		console.log(data)
		self.populateChannels(data);
	});

    Multigrain.Events.on('chanMsg', function(data) {
        self.channels[data.server][data.to].history.push({ from: data.from, message: data.message });
        self.addMessage({ from: data.from, message: data.message });
    });

    $(document).keypress(function(e) {
        if(e.which == 13)
        {
            var txt = $('#chat-text');

            var chat = {
                type: 'say',
                data: {
                    serverName: self.activeServer,
                    channel: self.activeChannel,
                    message: txt.val()
                }
            };

            Multigrain.App.socket.sendMessage(chat);
            txt.val('');
        }
    });

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
        this.activeServer = server;
		var item = this.channels[server][channel];
		$('#channel-name').html(channel);
		$('#channel-message').html(item.message);
		this.activeChannel = channel;
		this.activeNick = this.serverNicks[server];
		this.setNick();

		$('#chatlines').empty();
		item.history.forEach(function(history) {
			self.addMessage(history);
		});
	}
	$("#chat").animate({ scrollTop: $('#chat')[0].scrollHeight}, "fast");
	return channel;
};

Multigrain.Controllers.Main.prototype.addMessage = function(history)
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
        time: new Date()
    };
    $('#chatlines').append(Multigrain.App.templates.chatline(chatline));
    $("#chat").animate({ scrollTop: $('#chat')[0].scrollHeight}, "fast");
};

Multigrain.Controllers.Main.prototype.setNick = function()
{
	$('#user').text('@' + this.activeNick);
};

// todo refactor!

Multigrain.Controllers.Main.prototype.joinChannel = function(e)
{
    var self = this;
    var data = {
        servers: {
            local: 'localhost',
            freenode: 'Freenode',
            cyber: 'Cybernetica'
        }
    }
    this.dialog(Multigrain.App.templates.join(data));
};

Multigrain.Controllers.Main.prototype.commitJoin = function()
{
	var server = $('#join-server').val();
	var channel = $('#join-channel').val();
	Multigrain.App.socket.join(server, channel);
	this.channels[server] = this.channels[server] || {};
	this.channels[server][channel] = this.channels[server][channel] || { history: [], message: '' };
	$('#channel-list').append(Multigrain.App.templates.channel({
		channel: channel,
		server: server
	}));
	this.closeDialog();
}

// todo refactor this to a normal separate class

Multigrain.Controllers.Main.prototype.dialog = function(content)
{
    $('#dialog section.content').html(content);
    $('#dialog').fadeIn('fast');
    $('.dialog').css({'marginLeft': '-' + ($('.dialog').width() / 2) + 'px'});
};

Multigrain.Controllers.Main.prototype.closeDialog = function()
{
    $('#dialog section.content').empty();
    $('#dialog').hide();
};