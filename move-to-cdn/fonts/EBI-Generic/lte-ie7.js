/* Use this script if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'EBI-Generic\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-camera' : '&#x21;',
			'icon-steps' : '&#x23;',
			'icon-databaseCROSSLINK' : '&#x64;',
			'icon-alert' : '&#x6c;',
			'icon-graph' : '&#x67;',
			'icon-externalsystems' : '&#x79;',
			'icon-loveDATA' : '&#x6f;',
			'icon-publication' : '&#x50;',
			'icon-support' : '&#x73;',
			'icon-TOPLEVEL_Services2' : '&#x28;',
			'icon-TOPLEVEL_Research2' : '&#x29;',
			'icon-TOPLEVEL_Openday2' : '&#x2a;',
			'icon-TOPLEVEL_Industry2' : '&#x2d;',
			'icon-TOPLEVEL_Elixir2' : '&#x25;',
			'icon-TOPLEVEL_Careers2' : '&#x63;',
			'icon-videos' : '&#x56;',
			'icon-unreviewedDATA2' : '&#x51;',
			'icon-tutorial' : '&#x74;',
			'icon-travel_train2' : '&#x37;',
			'icon-TRAVEL_by_plane' : '&#x34;',
			'icon-Travel_by_Foot' : '&#x36;',
			'icon-Travel_by_car' : '&#x32;',
			'icon-TRAVEL_by_bus' : '&#x31;',
			'icon-TRAVEL_by_bike' : '&#x33;',
			'icon-train_online' : '&#x54;',
			'icon-toolKIT' : '&#x3a;',
			'icon-text-mining' : '&#x58;',
			'icon-terms_and_conditions' : '&#x27;',
			'icon-systems' : '&#x53;',
			'icon-reviewedDATA2' : '&#x71;',
			'icon-resource' : '&#x52;',
			'icon-piechart' : '&#x70;',
			'icon-OpendayV2' : '&#x4f;',
			'icon-nutraceuticals' : '&#x22;',
			'icon-news' : '&#x4e;',
			'icon-newcomers' : '&#x6e;',
			'icon-New' : '&#x3c;',
			'icon-mobiledevice' : '&#x2f;',
			'icon-meetus' : '&#x4d;',
			'icon-mailing-list' : '&#x6d;',
			'icon-location' : '&#x5b;',
			'icon-link' : '&#x4c;',
			'icon-info' : '&#x69;',
			'icon-industry' : '&#x49;',
			'icon-help' : '&#x3f;',
			'icon-health' : '&#x68;',
			'icon-GTLs' : '&#x47;',
			'icon-funding2' : '&#x46;',
			'icon-findUS' : '&#x5d;',
			'icon-Face_to_Face' : '&#x66;',
			'icon-external_link' : '&#x78;',
			'icon-email' : '&#x45;',
			'icon-Elixir' : '&#x65;',
			'icon-drug' : '&#x75;',
			'icon-documentation' : '&#x3b;',
			'icon-discuss' : '&#x5c;',
			'icon-database' : '&#x44;',
			'icon-contact' : '&#x43;',
			'icon-calanderEVENT' : '&#x72;',
			'icon-biotechDRUG' : '&#x42;',
			'icon-Beta' : '&#x3e;',
			'icon-basket' : '&#x62;',
			'icon-announcement' : '&#x55;',
			'icon-alumni' : '&#x41;',
			'icon-accommodation' : '&#x61;',
			'icon-EMBL_EBI_hex_black' : '&#x26;',
			'icon-home' : '&#x48;',
			'icon-clock' : '&#x7b;',
			'icon-groupTEAM' : '&#x7d;'
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