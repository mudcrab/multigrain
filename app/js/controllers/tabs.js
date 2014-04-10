window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Controllers.Tabs = function(settings)
{
	this.events = {
		'click #add': this.addTab
	};

	Cinder.Controller.call(this, settings, this.events);
};
Multigrain.Controllers.Tabs.prototype = Object.create(Cinder.Controller.prototype);
Multigrain.Controllers.Tabs.prototype.constructor = Cinder.Controller;

Multigrain.Controllers.Tabs.prototype.addTab = function()
{
	var tab = Multigrain.App.templates['tab'];
	var channel = prompt('Channel...');
	$('#channel-tabs').append(tab({ channel: '#' + channel.toLowerCase() }));
};

Multigrain.Controllers.Tabs.prototype.getTab = function()
{

};

Multigrain.Controllers.Tabs.prototype.removeTab = function()
{

};

Multigrain.Controllers.Tabs.prototype.removeTabs = function()
{

};