window.Cinder = window.Cinder || {};

(function(cinder) {

	var App = function(cb)
	{
		this.settings = {};
		this.router = null;
		this.controllers = {};
		this.templates = {};
		cb.call(this);
	};

	App.prototype.loadTemplates = function(list)
	{
		var self = this;
		for(var template in list)
		{
			if(list.hasOwnProperty(template))
			{
				$.ajax({ url: list[template].path + list[template].file, async: false }).done(function(tpl) {
					self.templates[template] = tmpl(tpl);
				});
			}
		}
	};

	var Router = function(routes)
	{
		var self = this;
		this.routes = this.routes || [];

		for(var route in routes)
		{
			self.routes.push({
				path: new RegExp(self.cleanRoute(route).replace(/\//g, "\\/").replace(/:(\w*)/g,"(\\w*)")),
				cb: routes[route]
			});
		}

		self.changeRoute();
		window.onhashchange = function() {
			self.changeRoute();
		};
	};

	Router.prototype.changeRoute = function()
	{
		var self = this;
		var url = self.cleanRoute(location.hash);
		url = url.replace('#', '');

		for(var route in this.routes)
		{
			var params = url.match(this.routes[route].path);
			if(params)
				this.routes[route].cb.apply(this, cleanParams(params));
		}

		function cleanParams(params)
		{
			params.splice(0, 1);
			delete params['index'];
			delete params['input'];

			return params;
		};
	};

	Router.prototype.cleanRoute = function(url)
	{
		if(url.substring(0, 1) == '/') url = url.substring(1);
		if(url.substring(url.length - 1, 1) == '/') url = url.substring(url.length - 1, 1);
		return url;
	};

	var View = function()
	{

	};

	var Controller = function(settings, events)
	{
		if(settings)
			this.view = settings.template || false;
		this.partials = {};
		this.events = events || {};
		this.setEvents();
		this.rendered = false;
	};

	Controller.prototype.setEvents = function()
	{
		var self = this;
		for(var event in this.events)
		{
			if(this.events.hasOwnProperty(event))
			{
				var ev = event.split(' ');
				$('body').on(ev[0], ev[1], function(e) { self.events[event].call(self, e); });
			}
		}
	};

	Controller.prototype.render = function(data)
	{
		if(this.view)
			return this.view();
	};

	cinder.App = App;
	cinder.Router = Router;
	cinder.View = View;
	cinder.Controller = Controller;

})(Cinder);