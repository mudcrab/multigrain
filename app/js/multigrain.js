window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Events = new Events();

Multigrain.router = new Cinder.Router({
	'': function() {
		var self = this;
		this.Main = new Multigrain.Controllers.Main();
		this.Main.render();
	},
});

Multigrain.App = new Cinder.App(function() {
	
	var self = this;
	this.socket = null;

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

	$('#login').click(function() {
		self.socket = new Socket(Multigrain.Events, $("#server-select").val(), 1337);
		self.socket.connect();

		Multigrain.Events.on('connected', function() {
			self.socket.auth($('#username').val(), $('#password').val());
		});

		Multigrain.Events.on('authenticated', function() {
			$('#login-overlay-bgr').remove();
		});
	});

});

function adjustSizes()
{
	$('#sidebar, #main').height($(window).height() - $('#header').height());
	$('#main').width($(window).width() - $('#sidebar').width());
	$('#main').css('left', $('#sidebar').width());
};

$(function() {
	adjustSizes();
});

$(window).resize(function() {
	adjustSizes();
});