var Socket = function(eventHandler, address, port)
{
	var self = this;

	this.events = eventHandler;
	this.uri = 'ws://' + address + ':' + port;
	this.ws = null;
	this.debug = true;
	this.connected = true;

	this.timeout = 0;

	this.events.on('socket.error', function() {
		if(self.timeout == 0)
		{
			self.retryConnection();
		}
	});
};

Socket.prototype.connect = function(cb)
{
	var self = this;
	self.ws = new WebSocket(self.uri);
	self.ws.onopen = function() { self.initConnection(); };
	self.ws.onclose = function() { self.closeConnection(); };
	self.ws.onmessage = function(e) {
		self.handleMessage(e.data);
	};
	self.ws.onerror = function(e) { self.handleError(e) };
};

Socket.prototype.retryConnection = function()
{
	var self = this;
	this.timeout = setInterval(function() {
		if(!self.connected)
		{
			self.connect();
		}
		else
		{
			window.clearInterval(self.timeout);
			self.timeout = 0;
		}
	}, 3000);
};

Socket.prototype.initConnection = function(event)
{
	this.connected = true;
	this.events.emit('socket.connected');
};

Socket.prototype.closeConnection = function(event)
{
	this.connected = false;
	this.events.emit('socket.error');
};

Socket.prototype.handleMessage = function(d)
{
	// $('#display').append('<li class="raw">' + d + '</li>');
	var msg = JSON.parse(d);
	console.info(msg);
	this.events.emit('socket.' + msg.type, msg.data);
};

Socket.prototype.handleError = function(event)
{
	this.connected = false;
	this.events.emit('socket.error', {
		data: event
	});
};

Socket.prototype.auth = function(user, pw)
{
	this.ws.send(JSON.stringify({ type: 'auth', data: {username: user, password: pw} }));
};

Socket.prototype.log = function(evt, data)
{
	console.log(event);
};

Socket.prototype.partChannel = function(server, channel)
{
	this.ws.send(JSON.stringify({ type: 'partChannel', data: { server: server, channel: channel } }));
};

Socket.prototype.sendMessage = function(data)
{
    this.ws.send(JSON.stringify(data));
}

Socket.prototype.join = function(_server, _channel)
{
    this.ws.send(JSON.stringify({ type: 'join', data: { server: _server, channel: _channel } }));
};

Socket.prototype.createSendObject = function(str)
{
	var m = { type: null, data: {} };

	if(str.charAt(0) == '/')
	{
		var dataArr = str.split(' ');
		m.type = dataArr.shift().replace('/', '');

		if(dataArr.length > 0)
			m.data = dataArr
	}
	else
	{
		m.type = 'say';
		m.data.serverName = 'local';
		m.data.channel = '#test';
		m.data.message = str;
	}
	return JSON.stringify(m);
};
