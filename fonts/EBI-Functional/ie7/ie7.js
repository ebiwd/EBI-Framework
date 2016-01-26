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
		el.innerHTML = '<span style="font-family: \'EBI-Functional\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-add': '&#x2b;',
		'icon-add-job': '&#x29;',
		'icon-add-user': '&#x37;',
		'icon-align': '&#x69;',
		'icon-analyse': '&#x41;',
		'icon-analyse-graph': '&#x7a;',
		'icon-approve': '&#x2f;',
		'icon-approved-job': '&#x28;',
		'icon-attach': '&#x61;',
		'icon-browse': '&#x62;',
		'icon-close': '&#x78;',
		'icon-collapse': '&#x77;',
		'icon-collapse-closed': '&#x39;',
		'icon-collapse-open': '&#x38;',
		'icon-compare': '&#x4f;',
		'icon-crop': '&#x5c;',
		'icon-cut': '&#x63;',
		'icon-database-submit': '&#x44;',
		'icon-delete': '&#x64;',
		'icon-download': '&#x3d;',
		'icon-edit': '&#x65;',
		'icon-edit-user': '&#x35;',
		'icon-expand': '&#x75;',
		'icon-filter': '&#x66;',
		'icon-first-page': '&#x5b;',
		'icon-fullscreen': '&#x46;',
		'icon-hierarchy': '&#x68;',
		'icon-last-page': '&#x5d;',
		'icon-like': '&#x6b;',
		'icon-lock': '&#x4c;',
		'icon-login': '&#x6c;',
		'icon-mapping': '&#x30;',
		'icon-menu': '&#x4d;',
		'icon-move': '&#x6d;',
		'icon-next-page': '&#x3e;',
		'icon-play': '&#x76;',
		'icon-previous-page': '&#x3c;',
		'icon-print': '&#x50;',
		'icon-redo': '&#x7d;',
		'icon-refresh': '&#x52;',
		'icon-remove': '&#x2d;',
		'icon-remove-user': '&#x36;',
		'icon-save': '&#x53;',
		'icon-scaleable': '&#x59;',
		'icon-search': '&#x31;',
		'icon-search-document': '&#x6a;',
		'icon-send': '&#x6e;',
		'icon-settings': '&#x73;',
		'icon-share': '&#x72;',
		'icon-stop': '&#x6f;',
		'icon-submit': '&#x5f;',
		'icon-target': '&#x54;',
		'icon-tool': '&#x74;',
		'icon-unassigned-job': '&#x2a;',
		'icon-undo': '&#x7c;',
		'icon-unlock': '&#x55;',
		'icon-view': '&#x34;',
		'icon-zoom-in': '&#x33;',
		'icon-zoom-out': '&#x32;',
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
