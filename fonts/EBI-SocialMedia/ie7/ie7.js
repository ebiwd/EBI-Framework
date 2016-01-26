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
		el.innerHTML = '<span style="font-family: \'EBI-SocialMedia\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-android': '&#x61;',
		'icon-apple': '&#x41;',
		'icon-blogger': '&#x42;',
		'icon-facebook': '&#x46;',
		'icon-flickr': '&#x66;',
		'icon-github': '&#x67;',
		'icon-googleplus': '&#x47;',
		'icon-linkedin': '&#x4c;',
		'icon-linux': '&#x58;',
		'icon-orcid': '&#x4f;',
		'icon-rss': '&#x52;',
		'icon-skype': '&#x73;',
		'icon-slideshare': '&#x53;',
		'icon-twitter': '&#x54;',
		'icon-vimeo': '&#x56;',
		'icon-weibo': '&#x57;',
		'icon-windows': '&#x77;',
		'icon-wordpress': '&#x50;',
		'icon-youtube': '&#x59;',
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
