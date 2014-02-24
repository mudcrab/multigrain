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

Multigrain.Controllers.Main = function(settings)
{
	this.events = {
		'click #channel-select': this.handleConnections
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
	dialog.show();
};

Multigrain.Controllers.Main.prototype.render = function()
{
	// $('#dialog-content').html(this.view({ asd: 'tere' }));
};

Multigrain.App = new Cinder.App(function() {
	var list = {
		'Blah': {
			path: '/templates/',
			file: 'test.html'
		},
		'tab': {
			path: '/templates/',
			file: 'tab.html'
		},
		'connect': {
			path: '/templates/',
			file: 'connect.html'
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
		// var dialog = new Dialog('blah', 'lol', [{ title: 'OK', id: 'ok', pos: 'right', click: function() { console.log('blah') } }]);
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
});

$(window).resize(function() {
	adjustSizes();
});