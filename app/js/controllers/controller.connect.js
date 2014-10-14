window.Multigrain = window.Multigrain || { Controllers: {} };

Multigrain.Controllers.Connect = function(settings)
{
	this.events = {
		'click #commit-add-server': this.addServer
	};

	Cinder.Controller.call(this, settings, this.events);
	
	$(settings.el).append(this.render());
};

Multigrain.Controllers.Connect.prototype = Object.create(Cinder.Controller.prototype);
Multigrain.Controllers.Connect.prototype.constructor = Cinder.Controller;

Multigrain.Controllers.Connect.prototype.show = function()
{
	$('#add-server-pane').toggleClass('closed active');
};

Multigrain.Controllers.Connect.prototype.addServer = function()
{
	var serverData = {
		name: 'local1',
		address: 'localhost',
		nick: 'khv',
		autojoin: false,
		rand: Math.random()
	};

	Multigrain.App.socket.connectToServer(serverData);
	/*var serverData = {};

	$('#add-server-form input').each(function() {
		if($(this).attr('name') != 'xx')
			serverData[$(this).attr('name')] = $(this).val();
	});

	if(serverData.address && serverData.name != '' && serverData.nick != '' && serverData.realname != '')
	{
		console.log('asd')
		Multigrain.App.socket.connectToServer(serverData);
	}*/
};