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
		el.innerHTML = '<span style="font-family: \'EBI-Conceptual\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-chemical': '&#x62;',
		'icon-systems': '&#x79;',
		'icon-expression': '&#x67;',
		'icon-proteins': '&#x50;',
		'icon-crossdomain': '&#x63;',
		'icon-ontology': '&#x6f;',
		'icon-literature': '&#x6c;',
		'icon-dna': '&#x64;',
		'icon-structures': '&#x73;',
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
