/* A polyfill for browsers that don't support ligatures. */
/* The script tag referring to this file must be placed before the ending body tag. */

/* To provide support for elements dynamically added, this script adds
   method 'icomoonLiga' to the window object. You can pass element references to this method.
*/
(function () {
	'use strict';
	function supportsProperty(p) {
		var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
			i,
			div = document.createElement('div'),
			ret = p in div.style;
		if (!ret) {
			p = p.charAt(0).toUpperCase() + p.substr(1);
			for (i = 0; i < prefixes.length; i += 1) {
				ret = prefixes[i] + p in div.style;
				if (ret) {
					break;
				}
			}
		}
		return ret;
	}
	var icons;
	if (!supportsProperty('fontFeatureSettings')) {
		icons = {
			'icon-barley': '&#x35;',
			'icon-rice': '&#x36;',
			'icon-anolis': '&#x37;',
			'icon-monodelphis': '&#x39;',
			'icon-papio': '&#x38;',
			'icon-amoeba': '&#x30;',
			'icon-mosquito': '&#x31;',
			'icon-diatom': '&#x32;',
			'icon-kangaroorat': '&#x33;',
			'icon-louse': '&#x34;',
			'icon-rabbit': '&#x74;',
			'icon-worm': '&#x57;',
			'icon-zebrafish': '&#x5a;',
			'icon-yeast': '&#x59;',
			'icon-spider': '&#x53;',
			'icon-scorpion': '&#x73;',
			'icon-rat': '&#x52;',
			'icon-plant': '&#x50;',
			'icon-pig': '&#x70;',
			'icon-mouse': '&#x4d;',
			'icon-monkey': '&#x72;',
			'icon-human': '&#x48;',
			'icon-horse': '&#x68;',
			'icon-fungus': '&#x75;',
			'icon-frog': '&#x66;',
			'icon-fly': '&#x46;',
			'icon-dog': '&#x64;',
			'icon-cow': '&#x43;',
			'icon-corn': '&#x63;',
			'icon-chicken': '&#x6b;',
			'icon-cat': '&#x41;',
			'icon-bug': '&#x62;',
			'icon-virus': '&#x76;',
			'icon-pufferfish': '&#x45;',
			'icon-hedgehog': '&#x6f;',
			'icon-guineapig': '&#x67;',
			'icon-gorilla': '&#x47;',
			'icon-bird': '&#x6e;',
			'icon-elephant': '&#x65;',
			'icon-dolphin': '&#x44;',
			'icon-armadillo': '&#x6c;',
			'icon-alpaca': '&#x61;',
			'icon-wallaby': '&#x77;',
			'icon-platypus': '&#x55;',
			'icon-chimpanzee': '&#x69;',
			'icon-brassica': '&#x42;',
			'icon-ecoli': '&#x4c;',
			'0': 0
		};
		delete icons['0'];
		window.icomoonLiga = function (els) {
			var classes,
				el,
				i,
				innerHTML,
				key;
			els = els || document.getElementsByTagName('*');
			if (!els.length) {
				els = [els];
			}
			for (i = 0; ; i += 1) {
				el = els[i];
				if (!el) {
					break;
				}
				classes = el.className;
				if (/icon-/.test(classes)) {
					innerHTML = el.innerHTML;
					if (innerHTML && innerHTML.length > 1) {
						for (key in icons) {
							if (icons.hasOwnProperty(key)) {
								innerHTML = innerHTML.replace(new RegExp(key, 'g'), icons[key]);
							}
						}
						el.innerHTML = innerHTML;
					}
				}
			}
		};
		window.icomoonLiga();
	}
}());