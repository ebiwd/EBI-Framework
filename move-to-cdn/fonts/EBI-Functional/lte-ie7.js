/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'EBI-Functional\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-compare' : '&#x4f;',
			'icon-untitled' : '&#x2f;',
			'icon-untitled-2' : '&#x2b;',
			'icon-untitled-3' : '&#x29;',
			'icon-untitled-4' : '&#x69;',
			'icon-untitled-5' : '&#x41;',
			'icon-untitled-6' : '&#x7a;',
			'icon-untitled-7' : '&#x28;',
			'icon-untitled-8' : '&#x61;',
			'icon-untitled-9' : '&#x62;',
			'icon-untitled-10' : '&#x78;',
			'icon-untitled-11' : '&#x5c;',
			'icon-untitled-12' : '&#x63;',
			'icon-untitled-13' : '&#x44;',
			'icon-untitled-14' : '&#x64;',
			'icon-untitled-15' : '&#x3d;',
			'icon-untitled-16' : '&#x65;',
			'icon-untitled-17' : '&#x66;',
			'icon-untitled-18' : '&#x5b;',
			'icon-untitled-19' : '&#x46;',
			'icon-untitled-20' : '&#x30;',
			'icon-untitled-21' : '&#x5d;',
			'icon-untitled-22' : '&#x6b;',
			'icon-untitled-23' : '&#x4c;',
			'icon-untitled-24' : '&#x6c;',
			'icon-untitled-25' : '&#x6d;',
			'icon-untitled-26' : '&#x3e;',
			'icon-untitled-27' : '&#x76;',
			'icon-untitled-28' : '&#x3c;',
			'icon-untitled-29' : '&#x50;',
			'icon-untitled-30' : '&#x7d;',
			'icon-untitled-31' : '&#x52;',
			'icon-untitled-32' : '&#x2d;',
			'icon-untitled-33' : '&#x53;',
			'icon-untitled-34' : '&#x31;',
			'icon-untitled-35' : '&#x6e;',
			'icon-untitled-36' : '&#x73;',
			'icon-untitled-37' : '&#x6f;',
			'icon-untitled-38' : '&#x54;',
			'icon-untitled-39' : '&#x74;',
			'icon-untitled-40' : '&#x68;',
			'icon-untitled-41' : '&#x7b;',
			'icon-untitled-42' : '&#x55;',
			'icon-untitled-43' : '&#x2a;',
			'icon-untitled-44' : '&#x5f;',
			'icon-untitled-45' : '&#x37;',
			'icon-untitled-46' : '&#x36;',
			'icon-untitled-47' : '&#x35;',
			'icon-untitled-48' : '&#x34;',
			'icon-untitled-49' : '&#x33;',
			'icon-untitled-50' : '&#x32;',
			'icon-untitled-51' : '&#x72;',
			'icon-untitled-52' : '&#x75;',
			'icon-untitled-53' : '&#x77;',
			'icon-collapse_closed' : '&#x39;',
			'icon-collapse_open' : '&#x38;'
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