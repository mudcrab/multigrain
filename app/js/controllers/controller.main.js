window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Controllers.Main = function(settings)
{
	this.events = {
		'click #multigrain-settings': this.connectServer
	};

	Cinder.Controller.call(this, settings, this.events);

	this.partials = settings.partials;
	// this.partials.chatline = Multigrain.App.templates.chatline;
	// $(settings.el).append(this.render())

	// 1. get serverlist
	// Multigrain.App.socket.getServers();
	// 2. set first one as active
	// 3. get channels for server
	// 4. set first as active
	// 5. get userlist for channel
	// App.socket.send();
};

Multigrain.Controllers.Main.prototype = Object.create(Cinder.Controller.prototype);
Multigrain.Controllers.Main.prototype.constructor = Cinder.Controller;

Multigrain.Controllers.Main.prototype.connectServer = function(e)
{
	Multigrain.App.controllers.Connect = Multigrain.App.controllers.Connect ||
	new Multigrain.Controllers.Connect({
		el: 'body',
		template: Multigrain.App.templates.connect
	});

	Multigrain.App.controllers.Connect.show();
};