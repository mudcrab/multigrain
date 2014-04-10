window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Events = new Events();



Multigrain.App = new Cinder.App(function() {
	
	var self = this;
	this.socket = null;

	var list = {
		'Blah': {
			file: 'test.html.hbs'
		},
		'tab': {
			file: 'tab.html.hbs'
		},
		'connect': {
			file: 'connect.html.hbs'
		},
		'chatline': {
			file: 'chatline.html.hbs'
		},
		'channel': {
			file: 'channel.html.hbs'
		},
        'join': {
            file: 'join.html.hbs'
        }
	};
	this.loadTemplates('/app/templates/', list);





	// $('#login').click(function() {
	    self.socket = new Socket(Multigrain.Events, $("#server-select").val(), 1337);
		self.socket.connect();

		Multigrain.Events.on('connected', function() {
			self.socket.auth($('#username').val(), $('#password').val());
		});

		Multigrain.Events.on('authenticated', function() {
			$('#login-overlay-bgr').remove();
		});
	// });
//	$('#login-overlay-bgr').remove();
	Multigrain.Events.on('chanlog', function(data) {
//		console.log(data)
	});
});

Multigrain.router = new Cinder.Router({
	'': function() {
		var self = this;
		this.Main = new Multigrain.Controllers.Main();
		this.Main.render();
	},
});

function adjustSizes()
{

};

$(function() {
	// adjustSizes();

	$('body').on('click', '#sidebar-toggle', function() {
		$('#sidebar').css('left', '0px');
		$('#container').css('left', '270px');
		$('#channel-message').css('marginLeft', 0);
	});

	$('#container').click(function() {
		if($(this).position().left == 270 && $(window).width() < 768)
		{
			$('#sidebar').css('left', '-270px');
			$(this).css('left', '0px');
			$('#channel-message').css('marginLeft', '25px');
		}
	})

});

$(window).resize(function() {
	if($(window).width() >= 768 && $('#container').position().left < 270)
	{
		$('#sidebar').css('left', '0px');
		$('#container').css('left', '270px');
		$('#channel-message').css('marginLeft', 0);
	}
});