window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Controllers.Main = function(settings)
{
	this.events = {
		'click #loler': this.clickTest
	};

	Cinder.Controller.call(this, settings, this.events);
	var self = this;
	// this.view = tmpl(self.view({ asd: 'loler' }))
};
Multigrain.Controllers.Main.prototype = Object.create(Cinder.Controller.prototype);
Multigrain.Controllers.Main.prototype.constructor = Cinder.Controller;

Multigrain.Controllers.Main.prototype.clickTest = function(e)
{
	e.preventDefault();
};

Multigrain.Controllers.Main.prototype.render = function()
{
	$('#dialog-content').html(this.view({ asd: 'tere' }));
};

Multigrain.App = new Cinder.App(function() {
	var list = {
		'Blah': {
			path: '/templates/',
			file: 'test.html'
		}
	};
	this.loadTemplates(list);
});

Multigrain.router = new Cinder.Router({
	'': function() {
		var self = this;
		// Multigrain.Controllers.Main
		// console.log(Multigrain.App.templates.Blah())
		this.Main = new Multigrain.Controllers.Main({ template: Multigrain.App.templates.Blah });
		this.Main.render();
		// $('#dialog-content').html(this.Main.render({ asd: 'blah' }));
	},
	'connect': function() {
		// console.log('connect')
		// Multigrain.Controllers.Connect
	},
	'/sometest/:id/:lol': function(id, lol) {
		console.log(id, lol);
	}
});