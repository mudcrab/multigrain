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
		if(self.timeout === 0)
		{
			self.retryConnection();
		}
	});
};

Socket.prototype.connect = function()
{
	var self = this;
	self.ws = new WebSocket(self.uri);
	self.ws.onopen = function() { self.initConnection(); };
	self.ws.onclose = function() { self.closeConnection(); };
	self.ws.onmessage = function(e) {
		self.handleMessage(e.data);
	};
	self.ws.onerror = function(e) { self.handleError(e); };
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
};

Socket.prototype.closeConnection = function(event)
{
	this.connected = false;
	this.events.emit('socket.error');
};

Socket.prototype.handleMessage = function(d)
{
	var msg = JSON.parse(d);
	this.events.emit('socket.' + msg.type, msg.data);
	this.events.emit('socket.raw.message', msg);
};

Socket.prototype.handleError = function(event)
{
	this.connected = false;
	this.events.emit('socket.error', {
		data: event
	});
};