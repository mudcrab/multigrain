(function () {

	'use strict';

	var settings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};

	var noMatch = /.^/;

	var escapes = {
		'\\': '\\',
		"'": "'",
		'r': '\r',
		'n': '\n',
		't': '\t',
		'u2028': '\u2028',
		'u2029': '\u2029'
	};

	for (var p in escapes) {
		escapes[escapes[p]] = p;
	}

	var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
	var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

	var tmpl = function (text, data, objectName) {
		settings.variable = objectName;

		var source = "__p+='" + text
		.replace(escaper, function (match) {
			return '\\' + escapes[match];
		})
		.replace(settings.escape || noMatch, function (match, code) {
			return "'+\n_.escape(" + unescape(code) + ")+\n'";
		})
		.replace(settings.interpolate || noMatch, function (match, code) {
			return "'+\n(" + unescape(code) + ")+\n'";
		})
		.replace(settings.evaluate || noMatch, function (match, code) {
			return "';\n" + unescape(code) + "\n;__p+='";
		}) + "';\n";

		if (!settings.variable) {
			source = 'with(obj||{}){\n' + source + '}\n';
		}

		source = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + source + "return __p;\n";

		var render = new Function(settings.variable || 'obj', source);

		if (data) {
			return render(data);
		}

		var template = function (data) {
			return render.call(this, data);
		};
		
		template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

		return template;
	};

	window.tmpl = tmpl;

}());