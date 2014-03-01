window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.router = new Cinder.Router({
	'': function() {
		var self = this;
		this.Main = new Multigrain.Controllers.Main();
		this.Main.render();
	},
});

Multigrain.App = new Cinder.App(function() {
	var list = {
		'Blah': {
			file: 'test.html'
		},
		'tab': {
			file: 'tab.html'
		},
		'connect': {
			file: 'connect.html'
		},
		'chatline': {
			file: 'chatline.html'
		}
	};
	this.loadTemplates('/app/templates/', list);
});

function adjustSizes()
{
	var w = $(window).width() - $('#username').width() - 20;
	$('#chat-input').width( w );
	$('#chat').width( w );

	$('#chat-display').height( $(window).height() - $('#header').height() - $('#footer').height() );
};

$(function() {
	adjustSizes();
});

$(window).resize(function() {
	adjustSizes();
});