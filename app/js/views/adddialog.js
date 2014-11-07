window.Multigrain = window.Multigrain || {};
Multigrain.View = Multigrain.View || {};

Multigrain.View.AddServerDialog = Multigrain.View.Dialog.extend({

    id: 'add-dialog',
    className: 'dialog',
    template: Tpl.addServer,

    events: {
        'click .confirm': 'addServer'
    },

    initialize: function()
    {

    },

    addServer: function()
    {

    },

    render: function()
    {
        var self = this;
        this.$el.html(this.bodyTemplate({
            title: 'Add server',
            cancel_text: 'Cancel',
            confirm_text: 'Confirm'
        }));

        this.$el.find('.dialog-content').html(this.template);

        // Multigrain.App.ui.servers.forEach(function(server) {
        //     var option = $('<option />', {
        //         text: server
        //     });
        //
        //     self.$el.find('select').append(option);
        // });
        return this;
    }

});
