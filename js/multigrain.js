var events = new Events();
String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}
function chatMsg(from, message)
{
	var li = $('<li/>');
	var time = $('<span/>').addClass('date').text('[ ' + moment().format('hh:mm:ss') + ' ] ')
	var from = $('<span/>').addClass('from').text('< ' + from + ' > ');
	var msg = $('<span/>').addClass('msg').text(message);

	li.append(time).append( from ).append( msg );

	return li;
};

var Socket = function(address, port)
{
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

	setTimeout(function() { cb(); }, 300);
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
	events.emit(msg.type, msg.data);
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

function adjustSizes()
{
	var w = $(window).width() - $('#username').width() - 20;
	$('#chat-input').width( w );
	$('#chat').width( w );

	$('#chat-display').height( $(window).height() - $('#header').height() - $('#footer').height() );
	// $('.dialog .container').css('height', '100%');
	// $('.dialog .container .content').height($('.dialog').height() - $('.dialog .title').height() - $('.actions').height() - 20);

	// $('.message').width($(window).width() - $('.nick').width() - $('.timestamp').width())
};

$(function() {
	adjustSizes();
	/*$('#chat').height($(window).height() - 95);
	$('#username').width( $('#uname-holder').width() - 15 );*/
	/*var socket = new Socket('192.168.1.77', 8081);
	socket.connect(function() {
		socket.auth('jk', 'asdf1234');
	});*/

	events.on('authenticated', function(data) {
		console.log(data);
	});

	events.on('chanMsg', function(data) {
		$('#display').append(chatMsg( data.from, data.message ));
	});

	$(document).keypress(function(e) {
		if(e.which == 13)
		{
			socket.pSend($('#inpt').val());
			$('#inpt').val('');
		}
	});
	/*for(var i = 0; i <= 100; i++)
	{
		$('#display').append(chatMsg(Faker.Internet.userName(), Faker.Lorem.sentences()));
	}*/
	 $("#display").animate({ scrollTop: $(document).height() + 95 }, "fast");


	/*var d1 = '/connect irc.freenode.org fn';
	var d2 = '/part';
	var d3 = '/join #ubuntu';
	var d4 = '/q';
	var d5 = 'tere';

	getStuff(d1);
	getStuff(d2);
	getStuff(d3);
	getStuff(d4);
	getStuff(d5);*/
	

	/*if(data.charAt(0) == '/' && data.split(' ').length > 1)
	{
		var arr = data.split(' '), m = {};
		arr.shift();
		m.data = { server: { addr: arr[0], name: arr[1] } };
		console.log(m)
	}*/
	var dialog = new Dialog('blah', 'lol', [{ title: 'OK', id: 'ok', pos: 'right', click: function() { console.log('blah') } }]);
	
	$('body').on('click', '#close-dialog', function() {
		dialog.hide();
	});

	$('.dialog').show();

	$('body').on('click', '#user-settings', function() {
		// $('.dialog').show();
		dialog.show();
	});
	
	templateLoader('connect.html', function(template) {
		dialog.setContent(template);
	});

});
$(window).resize(function() {
	adjustSizes();
	/*$('#chat').height($(window).height() - 95);
	$('#username').width( $('#uname-holder').width() - 15 );*/
});

var Dialog = function(title, content, buttons)
{
	this.dialogTitle = title;
	this.dialogContent = content;
	this.dialogButtons = buttons;

	this.init();
};

Dialog.prototype.init = function()
{
	$('.dialog #dialog-title').text(this.dialogTitle);

	// $('.dialog .container .content').html('this.dialogContent');
	// $('.dialog .container .content').height($('.dialog').height() - $('.dialog .title').height() - $('.actions').height() - 20);
	
	this.dialogButtons.forEach(function(button) {
		$('.dialog .container .actions .' + button.pos).append('<a id="' + button.id + '" href="#">' + button.title + '</a>')
		$('body').on('click', '#' + button.id, function() { button.click() });
	});
};

Dialog.prototype.show = function()
{
	$('.dialog').fadeIn();
};
Dialog.prototype.hide = function()
{
	$('.dialog').hide();
};

Dialog.prototype.setContent = function(content)
{
	$('.dialog .container .content').html(content);
};

var templateLoader = function(template, cb)
{
	$.ajax({ url: '/templates/' + template, async: false }).done(function(tpl) {
		cb(tpl);
	});
	/*$.ajax({ url: paths.path + template, async: false }).done(function(tpl) {
						Enitio.templates[file[0]].template = _.template(tpl);
					});*/
};