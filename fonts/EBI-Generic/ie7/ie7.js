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
		el.innerHTML = '<span style="font-family: \'EBI-Generic\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-accommodation': '&#x61;',
		'icon-alert': '&#x6c;',
		'icon-alumni': '&#x41;',
		'icon-announcement': '&#x55;',
		'icon-basket': '&#x62;',
		'icon-beta': '&#x3e;',
		'icon-bike': '&#x33;',
		'icon-biotech': '&#x42;',
		'icon-bus': '&#x31;',
		'icon-calendar': '&#x72;',
		'icon-camera': '&#x21;',
		'icon-car': '&#x32;',
		'icon-careers': '&#x63;',
		'icon-classification': '&#x65;',
		'icon-clock': '&#x7b;',
		'icon-contact': '&#x43;',
		'icon-crosslink': '&#x64;',
		'icon-database': '&#x44;',
		'icon-discuss': '&#x5c;',
		'icon-documentation': '&#x3b;',
		'icon-drug': '&#x75;',
		'icon-elixir': '&#x25;',
		'icon-email': '&#x45;',
		'icon-embl': '&#x26;',
		'icon-external-link': '&#x78;',
		'icon-external-systems': '&#x79;',
		'icon-face-to-face': '&#x66;',
		'icon-find-us': '&#x5d;',
		'icon-funding': '&#x46;',
		'icon-graph': '&#x67;',
		'icon-group': '&#x7d;',
		'icon-gtls': '&#x47;',
		'icon-health': '&#x68;',
		'icon-help': '&#x3f;',
		'icon-home': '&#x48;',
		'icon-industry': '&#x49;',
		'icon-info': '&#x69;',
		'icon-link': '&#x4c;',
		'icon-location': '&#x5b;',
		'icon-lovedata': '&#x6f;',
		'icon-mailing-list': '&#x6d;',
		'icon-math': '&#x76;',
		'icon-meet-us': '&#x4d;',
		'icon-mobile-device': '&#x2f;',
		'icon-new': '&#x3c;',
		'icon-newcomers': '&#x6e;',
		'icon-news': '&#x4e;',
		'icon-nutraceuticals': '&#x22;',
		'icon-open-day': '&#x4f;',
		'icon-piechart': '&#x70;',
		'icon-plane': '&#x34;',
		'icon-publication': '&#x50;',
		'icon-research': '&#x29;',
		'icon-resource': '&#x52;',
		'icon-reviewed-data': '&#x71;',
		'icon-services': '&#x28;',
		'icon-steps': '&#x23;',
		'icon-support': '&#x73;',
		'icon-systems': '&#x53;',
		'icon-terms': '&#x27;',
		'icon-test': '&#x30;',
		'icon-text-mining': '&#x58;',
		'icon-toolkit': '&#x3a;',
		'icon-train': '&#x37;',
		'icon-training': '&#x54;',
		'icon-tutorial': '&#x74;',
		'icon-unreviewed-data': '&#x51;',
		'icon-video': '&#x56;',
		'icon-walk': '&#x36;',
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
