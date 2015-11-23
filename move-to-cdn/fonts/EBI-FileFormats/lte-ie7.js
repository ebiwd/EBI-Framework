/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'EBI-FileFormats\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-file_ZIP' : '&#x5a;',
			'icon-untitled' : '&#x33;',
			'icon-untitled-2' : '&#x78;',
			'icon-untitled-3' : '&#x64;',
			'icon-untitled-4' : '&#x74;',
			'icon-untitled-5' : '&#x76;',
			'icon-untitled-6' : '&#x73;',
			'icon-untitled-7' : '&#x58;',
			'icon-untitled-8' : '&#x44;',
			'icon-untitled-9' : '&#x72;',
			'icon-untitled-10' : '&#x31;',
			'icon-untitled-11' : '&#x32;',
			'icon-untitled-12' : '&#x70;',
			'icon-untitled-13' : '&#x6f;',
			'icon-untitled-14' : '&#x4f;',
			'icon-untitled-15' : '&#x4d;',
			'icon-untitled-16' : '&#x4a;',
			'icon-untitled-17' : '&#x49;',
			'icon-untitled-18' : '&#x47;',
			'icon-untitled-19' : '&#x46;',
			'icon-untitled-20' : '&#x66;',
			'icon-untitled-21' : '&#x61;',
			'icon-untitled-22' : '&#x63;',
			'icon-untitled-23' : '&#x52;',
			'icon-untitled-24' : '&#x43;',
			'icon-untitled-25' : '&#x42;',
			'icon-untitled-26' : '&#x41;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};