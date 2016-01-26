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
            'accommodation': '&#x61;',
            'alert': '&#x6c;',
            'alumni': '&#x41;',
            'announcement': '&#x55;',
            'basket': '&#x62;',
            'beta': '&#x3e;',
            'bike': '&#x33;',
            'biotech': '&#x42;',
            'bus': '&#x31;',
            'calendar': '&#x72;',
            'camera': '&#x21;',
            'car': '&#x32;',
            'careers': '&#x63;',
            'classification': '&#x65;',
            'clock': '&#x7b;',
            'contact': '&#x43;',
            'crosslink': '&#x64;',
            'database': '&#x44;',
            'discuss': '&#x5c;',
            'documentation': '&#x3b;',
            'drug': '&#x75;',
            'elixir': '&#x25;',
            'email': '&#x45;',
            'embl': '&#x26;',
            'externallink': '&#x78;',
            'externalsystems': '&#x79;',
            'facetoface': '&#x66;',
            'findus': '&#x5d;',
            'funding': '&#x46;',
            'graph': '&#x67;',
            'group': '&#x7d;',
            'gtls': '&#x47;',
            'health': '&#x68;',
            'help': '&#x3f;',
            'home': '&#x48;',
            'industry': '&#x49;',
            'info': '&#x69;',
            'link': '&#x4c;',
            'location': '&#x5b;',
            'lovedata': '&#x6f;',
            'mailinglist': '&#x6d;',
            'math': '&#x76;',
            'meetus': '&#x4d;',
            'mobiledevice': '&#x2f;',
            'new': '&#x3c;',
            'newcomers': '&#x6e;',
            'news': '&#x4e;',
            'nutraceuticals': '&#x22;',
            'openday': '&#x4f;',
            'piechart': '&#x70;',
            'plane': '&#x34;',
            'publication': '&#x50;',
            'research': '&#x29;',
            'resource': '&#x52;',
            'revieweddata': '&#x71;',
            'services': '&#x28;',
            'steps': '&#x23;',
            'support': '&#x73;',
            'systems': '&#x53;',
            'terms': '&#x27;',
            'test': '&#x30;',
            'textmining': '&#x58;',
            'toolkit': '&#x3a;',
            'train': '&#x37;',
            'training': '&#x54;',
            'tutorial': '&#x74;',
            'unrevieweddata': '&#x51;',
            'video': '&#x56;',
            'walk': '&#x36;',
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
