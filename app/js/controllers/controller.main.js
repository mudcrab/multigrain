window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Controllers.Main = function(settings)
{
	console.log('main')
	Cinder.Controller.call(this, settings, this.events);

	this.partials = settings.partials;
	// this.partials.chatline = Multigrain.App.templates.chatline;
	new Multigrain.Controllers.Connect({})
	// $(settings.el).append(this.render())
};

Multigrain.Controllers.Main.prototype = Object.create(Cinder.Controller.prototype);
Multigrain.Controllers.Main.prototype.constructor = Cinder.Controller;