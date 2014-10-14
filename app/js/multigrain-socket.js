var MultigrainSocket = function(eventHandler, address, port)
{
	Socket.call(this, eventHandler, address, port);
};

MultigrainSocket.prototype = Object.create(Socket.prototype);
MultigrainSocket.prototype.constructor = Socket;

MultigrainSocket.prototype.socketData = function(type, data)
{
	return JSON.stringify({
		type: type,
		data: data || {}
	});
};

MultigrainSocket.prototype.auth = function(email, password)
{
	this.ws.send(this.socketData('auth', {
		email: email,
		password: password
	}));
};

/*
	Connect or add an IRC server
	@param object serverData
*/

MultigrainSocket.prototype.connectToServer = function(serverData)
{
	this.ws.send(this.socketData('irc.connect', serverData));
};

MultigrainSocket.prototype.disconnectFromServer = function(serverName)
{
	this.ws.send(this.socketData('irc.disconnect', { name: serverName }));
};

MultigrainSocket.prototype.joinChannel = function(name, channel)
{
	this.ws.send(this.socketData('irc.join', {
		name: name,
		channel: channel
	}))
};

MultigrainSocket.prototype.partChannel = function()
{
	// 
};

MultigrainSocket.prototype.say = function(name, target, message)
{
	this.ws.send(this.socketData('irc.say', {
		name: name,
		target: target,
		message: message
	}));
};

MultigrainSocket.prototype.getServers = function()
{
	this.ws.send(this.socketData('irc.servers'), {});
};

MultigrainSocket.prototype.getServerChannels = function(serverName)
{
	this.ws.send(this.socketData('irc.channels', {
		server: serverName
	}));
};

MultigrainSocket.prototype.getServerNicks = function(serverName, channelName)
{
	this.ws.send(this.socketData('irc.names', {
		name: serverName,
		channel: channelName
	}))
};

/*var sck = new MultigrainSocket(Ev, 'localhost', 1337);
sck.connect();

Ev.on('socket.connected', function() {
	sck.auth('jevgeni@pitfire.eu', 'asdf1234');
});

Ev.on('socket.auth', function(authData) {
	if(authData.status)
	{
		sck.connectToServer({ name: 'local2' });
	}
});*/

/*Ev.on('irc.connected', function() {
	sck.joinChannel('local', '#test2');

	setTimeout(function() {
		sck.say('local', '#test', 'yes this is doge');
	}, 3000);
});*/

/*setTimeout(function() {
		sck.say('local2', '#test', 'yes this is doge');
		sck.getServers();
		sck.getServerNicks('local2', '#test2');
	}, 3000);

Ev.on('socket.raw.message', function(data) {
	console.info('RAW', data, JSON.stringify(data));
});*/

/*
config.events.on('socket.' + this.sId + '.irc.connect', this.connect, this);
config.events.on('socket.' + this.sId + '.irc.disconnect', this.disconnect, this);
config.events.on('socket.' + this.sId + '.irc.join', this.join, this);
config.events.on('socket.' + this.sId + '.irc.part', this.part, this);
config.events.on('socket.' + this.sId + '.irc.say', this.say, this);
config.events.on('socket.' + this.sId + '.irc.servers', this.servers, this);
config.events.on('socket.' + this.sId + '.irc.channels', this.channels, this);
config.events.on('socket.' + this.sId + '.irc.names', this.names, this);
*/