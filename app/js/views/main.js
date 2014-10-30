window.Multigrain = window.Multigrain || {};
window.Multigrain.View = window.Multigrain.View || {};

(function($) {
	Multigrain.View.Main = Backbone.View.extend({

		events: {
			'click .toggle-sidebar': 'toggleSidebar'
		},
		template: Tpl.main,
		sidebar: {},
		input: {},
		// sidebar: new Multigrain.View.ChannelsSidebar(),

		initialize: function(options) 
		{
			$.cookie('authenticated', false);
			this.sidebar = new Multigrain.View.Sidebar();
			Multigrain.App.Chat = new Multigrain.View.Chat();
			this.input = new Multigrain.View.ChatInput();
		},

		toggleSidebar: function()
		{
			this.$('#sidebar').toggleClass('close');
			this.$('.toggle-sidebar').toggleClass('active');
			this.$('#main').toggleClass('full');
		},

		render: function() 
		{
			this.$el.empty();
			this.$el.append($('<section/>', { id: 'main' }));
			this.$el.append(this.sidebar.render().el);
			this.$('#main').append(Multigrain.App.Chat.render().el);
			this.$('#main').append(this.input.render().el);
			this.$el.append('<span class="toggle-sidebar"><i class="ion-navicon"></i></span>')
			return this;
		}

	});
})(jQuery);