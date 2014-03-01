window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Controllers.Main = function(settings)
{
	this.events = {
		'click #channel-select': this.handleConnections,
		'click #user-settings': this.addLine,
	};

	Cinder.Controller.call(this, settings, this.events);
	var self = this;

	var Tabs = new Multigrain.Controllers.Tabs();
	// this.view = tmpl(self.view({ asd: 'loler' }))
};
Multigrain.Controllers.Main.prototype = Object.create(Cinder.Controller.prototype);
Multigrain.Controllers.Main.prototype.constructor = Cinder.Controller;

Multigrain.Controllers.Main.prototype.handleConnections = function(e)
{
	e.preventDefault();
	console.log('asd')
	var dialog = new Multigrain.ui.Dialog('blah', 'lol', [{ title: 'Connect', id: 'ok', pos: 'right', click: function() { console.log('blah') } }]);
	dialog.setContent(Multigrain.App.templates.connect);
	dialog.open();
};

Multigrain.Controllers.Main.prototype.addLine = function()
{
	$('#display').append(Multigrain.App.templates.chatline({ type: 'regular', nick: 'blah', msg: 'Some message', timestamp: '00:12' }))
};

Multigrain.Controllers.Main.prototype.render = function()
{
	// $('#dialog-content').html(this.view({ asd: 'tere' }));
};