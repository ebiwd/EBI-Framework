/* Copyright (c) EMBL-EBI 2016 */

(function cookieBanner() {
   function setCookie(c_name, value, exdays) {

    var exdate = new Date();
    var c_value;
    exdate.setDate(exdate.getDate() + exdays);
    c_value = escape(value) + ((exdays===null) ? "" : ";expires=" + exdate.toUTCString()) + ";domain=.ebi.ac.uk;path=/";
    document.cookie = c_name + "=" + c_value;
    c_value = escape(value) + ((exdays===null) ? "" : ";expires=" + exdate.toUTCString()) + ";domain=" + document.domain + ";path=/";
    document.cookie = c_name + "=" + c_value;
  }

  function getCookie(c_name) {
    var i, x, y, ARRcookies=document.cookie.split(";");
    for (i=0; i<ARRcookies.length; i++)
    {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x = x.replace(/^\s+|\s+$/g,"");
      if (x===c_name) {
        return unescape(y);
      }
    }
  }

  function createStyles() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
      
    style.type = 'text/css';
    var css = "" +
    "  #cookie-banner {position:fixed;background-color:#444;width:100%;left:0;color:#eee;}" +
    "  #cookie-banner a {color:#fff;}";

    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  }

  function createBanner() {
    var banner = document.createElement('div');
    var wrapper = document.createElement('div');
    var inner = document.createElement('div');

    banner.id = "cookie-banner";
    wrapper.className = "row";
    wrapper.innerHTML = "" +
    "  This website uses cookies. By continuing to browse this site, you are agreeing to the use of our site cookies. " +
    "  To find out more, see our <a href='//www.ebi.ac.uk/about/terms-of-use'>Terms of Use</a>." +
    "  <div id='cookie-dismiss' class='button'><a href='#'>OK</a></div>" +
    "";

    document.body.appendChild(banner);
    banner.appendChild(wrapper);
  }

  function openBanner() {
    var height = document.getElementById('cookie-banner').offsetHeight;
    var heightBrowser = window.innerHeight;
    console.log(heightBrowser-height);
    document.getElementById('cookie-banner').style.display = 'block';
    document.getElementById('cookie-banner').style.top = heightBrowser-height+'px';
    document.body.style.paddingBottom = height+'px';
  }
  
  function closeBanner() {
    var height = document.getElementById('cookie-banner').offsetHeight;
    document.getElementById('cookie-banner').style.display = 'none';
    document.body.style.paddingBottom = '0';
  }
  
  function init() {
    try {
      if (getCookie('cookies-accepted') !== 'true') {

        createStyles();
        createBanner();
        openBanner(); 

        document.getElementById('cookie-dismiss').onclick = function() {
          setCookie('cookies-accepted', 'true', 90);

          closeBanner();
          return false;
        };
      }
    }
    catch(err) {
      setTimeout(init, 100);
    }
  }

  init();
  
})();
