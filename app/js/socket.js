var Socket = function(eventHandler, address, port)
{
	this.events = eventHandler;
	this.uri = 'ws://' + address + ':' + port;
	this.ws = null;
	this.debug = true;
};

Socket.prototype.connect = function(cb)
{
	var self = this;
	self.ws = new WebSocket(self.uri);
	self.ws.onopen = self.initConnection;
	self.ws.onclose = self.closeConnection;
	self.ws.onmessage = function(e) {
		self.handleMessage(e.data);
	};
	self.ws.onerror = self.handleError;
};

Socket.prototype.initConnection = function(event)
{

};

Socket.prototype.closeConnection = function(event)
{
	console.log(event);
};

Socket.prototype.handleMessage = function(d)
{
	// $('#display').append('<li class="raw">' + d + '</li>');
	var msg = JSON.parse(d);
	// console.log(msg)
	this.events.emit(msg.type, msg.data);
};

Socket.prototype.handleError = function(event)
{
	console.log(event);
};

Socket.prototype.auth = function(user, pw)
{
	this.ws.send(JSON.stringify({ type: 'auth', data: {username: user, password: pw} }));
};

Socket.prototype.log = function(evt, data)
{
	console.log(event);
};

Socket.prototype.pSend = function(data)
{
	this.ws.send(this.createSendObject(data));
	/*var m = { type: 'say', data: null };
	if(data.charAt(0) == '/')
	{
		if(data.match(/\/(.*?) /) != null)
			m.type = data.match(/\/(.*?) /)[1];
		else
			m.type = data.replace('/', '');

		if(data.indexOf(" ") > -1)
		{
			
		}
	}
	else
	{
		m.data = { channel: '#test', msg: data };
		// $('#display').append(chatMsg('mg', m.data.msg));
	}
	console.log(m)*/

	// this.ws.send(JSON.stringify(m));
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
