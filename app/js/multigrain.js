window.Multigrain = window.Multigrain || {};

(function($) {
	'use strict';

	var Router = Backbone.Router.extend({
		initialize: function()
		{

		}
	});

	Multigrain.Router = new Router();
	Backbone.history.start();
})(jQuery);

$(function() {
	'use strict';

	Multigrain.Events = new Events();
	new Multigrain.MainView();
});

// Multigrain.App = Multigrain.App || new Cinder.App(function() {
	/*var self = this;
	this.socket = new MultigrainSocket(Multigrain.Events, '192.168.12.106', 1337);
	this.templates = MG.templates;

	$.cookie('authenticated', false);
	$.cookie('username', null);
	$.cookie('uid', null);

	var loginView = new Multigrain.Controllers.Login();

	this.socket.connect();

	Multigrain.Events.on('socket.error', function(ev) {
		$('#server-status').removeClass('ok').addClass('err').find('.txt').text('Connection error');
	});

	Multigrain.Events.on('socket.connected', function() {
		$('#server-status').removeClass('err').addClass('ok').find('.txt').text('Server connected');
	});

	Multigrain.Events.on('socket.raw.message', function(msg) {
		console.log(msg, JSON.stringify(msg));
	});*/
// });