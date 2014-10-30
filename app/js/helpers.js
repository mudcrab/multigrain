window.Multigrain = window.Multigrain || {};

(function() {
	'use strict';
	
	Multigrain.Helper = {

		getChannelId: function(server, channel)
		{
			return server + '_' + channel.replace('#', '');
		}

	};
})(jQuery);