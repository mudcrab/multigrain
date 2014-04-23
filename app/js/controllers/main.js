window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Controllers.Main = function(settings)
{
	var self = this;
	this.channels = new Multigrain.Controllers.Channels({
		template: Multigrain.App.templates.channels
	});

	this.events = {
		'keypress #chat-text': this.handleMessageSending
	};

	Cinder.Controller.call(this, settings, this.events);
};

Multigrain.Controllers.Main.prototype = Object.create(Cinder.Controller.prototype);
Multigrain.Controllers.Main.prototype.constructor = Cinder.Controller;

Multigrain.Controllers.Main.prototype.handleMessageSending = function(e)
{
	var self = this;
	if(e.which === 13)
	{
		var txt = $('#chat-text');

		var chat = {
		    type: 'say',
		    data: {
		        serverName: this.channels.activeServer,
		        channel: this.channels.activeChannel,
		        message: txt.val()
		    }
		};

		Multigrain.App.socket.sendMessage(chat);
		txt.val('');
	}
};