/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'EBI-Species\'">' + entity + '</span>' + html;
	}
	var icons = {
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
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
