window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Controllers.Login = function(settings)
{
	var self = this;
	this.events = {
		'click #login': this.handleLogin
	};

	Cinder.Controller.call(this, settings, this.events);
	$(settings.el).append(this.render());
	setTimeout(function() {
		self.handleLogin()
	}, 100);
};

Multigrain.Controllers.Login.prototype = Object.create(Cinder.Controller.prototype);
Multigrain.Controllers.Login.prototype.constructor = Cinder.Controller;

Multigrain.Controllers.Login.prototype.handleLogin = function()
{
	Multigrain.App.socket.auth($('#u').val(), $('#pw').val())

	Multigrain.Events.on('socket.auth', function(data) {
		if(data.status)
		{
			$.cookie('authenticated', true);
			$.cookie('username', 'jevgeni@pitfire.eu');
			$.cookie('uid', 1234);

			$('#login-dialog').addClass('closed');

			Multigrain.App.controllers.Main = new Multigrain.Controllers.Main({
				partials: {
					chatline: Multigrain.App.templates.chatline
				}
			});
		}
		else
		{
			$('#login-msg').text('Authentication error.').fadeIn();
		}
	});
};