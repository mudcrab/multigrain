window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Controllers.Connect = function(settings)
{
	Cinder.Controller.call(this, settings, this.events);
	
	$(settings.el).append(this.render());
};

Multigrain.Controllers.Connect.prototype = Object.create(Cinder.Controller.prototype);
Multigrain.Controllers.Connect.prototype.constructor = Cinder.Controller;