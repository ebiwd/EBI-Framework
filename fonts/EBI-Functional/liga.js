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
            'add': '&#x2b;',
            'addjob': '&#x29;',
            'adduser': '&#x37;',
            'align': '&#x69;',
            'analyse': '&#x41;',
            'analysegraph': '&#x7a;',
            'approve': '&#x2f;',
            'approvedjob': '&#x28;',
            'attach': '&#x61;',
            'browse': '&#x62;',
            'close': '&#x78;',
            'collapse': '&#x77;',
            'collapseclose': '&#x39;',
            'collapseopen': '&#x38;',
            'compare': '&#x4f;',
            'crop': '&#x5c;',
            'cut': '&#x63;',
            'databasesubmit': '&#x44;',
            'delete': '&#x64;',
            'download': '&#x3d;',
            'edit': '&#x65;',
            'edituser': '&#x35;',
            'expand': '&#x75;',
            'filter': '&#x66;',
            'firstpage': '&#x5b;',
            'fullscreen': '&#x46;',
            'hierarchy': '&#x68;',
            'lastpage': '&#x5d;',
            'like': '&#x6b;',
            'lock': '&#x4c;',
            'login': '&#x6c;',
            'mapping': '&#x30;',
            'menu': '&#x4d;',
            'move': '&#x6d;',
            'nextpage': '&#x3e;',
            'play': '&#x76;',
            'previouspage': '&#x3c;',
            'print': '&#x50;',
            'redo': '&#x7d;',
            'refresh': '&#x52;',
            'remove': '&#x2d;',
            'removeuser': '&#x36;',
            'save': '&#x53;',
            'scaleable': '&#x59;',
            'search': '&#x31;',
            'searchdoc': '&#x6a;',
            'send': '&#x6e;',
            'settings': '&#x73;',
            'share': '&#x72;',
            'stop': '&#x6f;',
            'submit': '&#x5f;',
            'target': '&#x54;',
            'tool': '&#x74;',
            'unassignedjob': '&#x2a;',
            'undo': '&#x7c;',
            'unlock': '&#x55;',
            'view': '&#x34;',
            'zoomin': '&#x33;',
            'zoomout': '&#x32;',
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
