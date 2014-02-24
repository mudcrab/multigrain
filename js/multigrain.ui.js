window.Multigrain.ui = window.Multigrain.ui || {};

Multigrain.ui.Dialog = function(title, content, buttons)
{
	this.dialogTitle = title;
	this.dialogContent = content;
	this.dialogButtons = buttons;

	this.init();
};

Multigrain.ui.Dialog.prototype.init = function()
{
	var self = this;
	$('.dialog #dialog-title').text(this.dialogTitle);

	// $('.dialog .container .content').html('this.dialogContent');
	// $('.dialog .container .content').height($('.dialog').height() - $('.dialog .title').height() - $('.actions').height() - 20);
	
	this.dialogButtons.forEach(function(button) {
		$('.dialog .container .actions .' + button.pos).append('<a id="' + button.id + '" href="#">' + button.title + '</a>')
		$('body').on('click', '#' + button.id, function() { button.click() });
	});

	$('body').on('click', '#dialog-close', function() {
		self.hide();
	});
};

Multigrain.ui.Dialog.prototype.show = function()
{
	$('.dialog').fadeIn();
};

Multigrain.ui.Dialog.prototype.hide = function()
{
	$('.dialog').hide();
};

Multigrain.ui.Dialog.prototype.setContent = function(content)
{
	$('.dialog .container .content').html(content);
};