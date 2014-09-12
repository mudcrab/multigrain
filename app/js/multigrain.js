window.Multigrain = window.Multigrain || { Controllers: {} };
Multigrain.Events = new Events();

Multigrain.App = new Cinder.App(function() {
	var self = this;
	this.socket = new Socket(Multigrain.Events, '192.168.12.106', 1337);;

	var tpls = {
		'Login': {
			file: 'login.html.hbs',
		},
		'chatline': {
			file: 'chatline.html.hbs'
		},
		'Lonnect': {
			file: 'connect.html.hbs'
		}
	};

	this.loadTemplates('/templates/', tpls);

	$.cookie('authenticated', false);
	$.cookie('username', null);
	$.cookie('uid', null);

	var loginView = new Multigrain.Controllers.Login({ 
		template: self.templates.Login,
		el: 'body'
	});

	this.socket.connect();

	Multigrain.Events.on('socket.error', function(ev) {
		$('#server-status').removeClass('ok').addClass('err').find('.txt').text('Connection error');
	});

	Multigrain.Events.on('socket.connected', function() {
		$('#server-status').removeClass('err').addClass('ok').find('.txt').text('Server connected');
	});

	/*if(!$.cookie('authenticated'))
	{
		var loginView = new Multigrain.Controllers.Login({ 
			template: self.templates.Login,
			el: 'body'
		});
		// $('body').html(loginView.render());
	}
	else
		this.controllers.Main = new Multigrain.Controllers.Main({
			partials: {
				chatline: self.templates.chatline
			}
		});*/
});