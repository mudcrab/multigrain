window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

(function($) {
	Multigrain.View.Sidebar = Backbone.View.extend({

		template: Tpl.sidebar,
		tagName: 'section',
		id: 'sidebar',
		channels: {},

		events: {
			
		},

		initialize: function(options) 
		{
			this.channels = new Multigrain.View.Channels();
			Multigrain.App.ChannelInfo = new Multigrain.Model.ChannelInfo();

			this.listenTo(Multigrain.App.ChannelInfo, 'change', this.updateHeader);
		},

		updateHeader: function()
		{
			this.$('.channel-title').text(Multigrain.App.ChannelInfo.get('channel'));
		},

		render: function() 
		{
			this.$el.html(this.template(Multigrain.App.ChannelInfo.attributes));
			this.$('section.container').html(this.channels.render().el);
			return this;
		}

	});
})(jQuery);