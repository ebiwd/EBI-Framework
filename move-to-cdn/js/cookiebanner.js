/* Copyright (c) EMBL-EBI 2013
   Authors: 
   Peter Walter (pwalter@ebi.ac.uk)
*/

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

  function slide(element, property, start, end, duration, units) {
/*
    var s = element.style;
    s[property] = start + units;
    
    var pos = start;
    var frame = 0;
    var framerate = 25;
    var one_second = 1000;
    var interval = one_second*duration/framerate;
    var totalframes = one_second*duration/interval;
    var increment = (end-start)/totalframes;
    var tween = function () {
      frame++;
      pos += increment;
      s[property] = Math.round(pos) + units;
      if (frame < totalframes) {
        setTimeout(tween,interval);
      }
    }
    tween();
*/
    var s = element.style;
    s[property] = end + units;
  }
  function createStyles() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
      
    style.type = 'text/css';
    var css = "" +
    "  #cookie-banner {position:absolute;top:-9999px;background-color:#444;width:100%;border-bottom:5px solid #444;left:0;}" +
    "  #cookie-banner .container_24 {max-width:800px;margin:0 auto;}" +
    "  #cookie-banner h1 {font-size:medium;color:#ddd;margin:5px 0;font-family:Verdana,sans-serif;}" +
    "  #cookie-banner p {margin:5px 0;color:#eee;font-size:smaller;font-family:Verdana,sans-serif;line-height:1.538;}" +
    "  #cookie-banner a {color:#fff;}" +
    "  #cookie-banner a#cookie-dismiss {float:right;margin:0.5em 0 0.5em 0.5em;padding:3px 9px;-moz-border-radius:5px;-khtml-border-radius:5px;-webkit-border-radius:5px;border-radius:5px;font-size:108%;border-width:1px;box-shadow:0px 2px 2px #adadad;-moz-box-shadow:0px 2px 2px #adadad;-khtml-box-shadow:0px 2px 2px #adadad;-webkit-box-shadow:0px 2px 2px #adadad;width:auto;*padding-top:0px;*padding-bottom:0px;border-color:#295c5c;background-color:#207a7a;background-image:-moz-linear-gradient(top, #54bdbd, #207a7a);background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0, #54bdbd),color-stop(1, #207a7a));background-image:-webkit-linear-gradient(#54bdbd, #207a7a);background-image:linear-gradient(top, #54bdbd, #207a7a);filter:progid:DXImageTransform.Microsoft.gradient(startColorStr='#54bdbd', EndColorStr='#207a7a');color:#f8f8f8;text-shadow:#145251 0 1px 1px;display:inline;text-decoration:none;}" +
    "";

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
    wrapper.className = "container_24";
    inner.className = "grid_24";
    inner.innerHTML = "" +
    "  <p><a id='cookie-dismiss' href='#'>OK</a>" +
    "  This website uses cookies. By continuing to browse this site, you are agreeing to the use of our site cookies. " +
    "  To find out more, see our <a href='//www.ebi.ac.uk/about/terms-of-use'>Terms of Use</a>.</p>" +
    "";

    document.body.appendChild(banner);
    banner.appendChild(wrapper);
    wrapper.appendChild(inner);
  }

  function openBanner() {
    var height = document.getElementById('cookie-banner').offsetHeight;
    slide(document.getElementById('cookie-banner'), 'top', -height, 0, 0.25, 'px');
    slide(document.body, 'paddingTop', 0, height, 0.25, 'px');
  }
  
  function closeBanner() {
    var height = document.getElementById('cookie-banner').offsetHeight;
    slide(document.getElementById('cookie-banner'), 'top', 0, -9999, 0.25, 'px');
    slide(document.body, 'paddingTop', height, 0, 0.25, 'px');
  }
  
  function init() {
    try {
      if (getCookie('cookies-accepted') !== 'true') {

        createStyles();
        createBanner();
        openBanner();
        
      if (window.addEventListener) {
        window.addEventListener('resize', openBanner, false);
      }
      else if (window.attachEvent) {
        window.attachEvent('onresize', openBanner);
      }

      document.getElementById('cookie-dismiss').onclick = function() {
          setCookie('cookies-accepted', 'true', 90);

          if (window.addEventListener) {
            window.removeEventListener('resize', openBanner, false);
          }
          else if (window.attachEvent) {
            window.detachEvent('onresize', openBanner);
          }

          closeBanner();
          return false;
        };
      }
    }
    catch(err) {
      setTimeout(init, 100);
    }
  }

  // attach to onload event
  if (window.addEventListener) {
    window.addEventListener('load', init, false);
  }
  else if (window.attachEvent) {
    window.attachEvent('onload', init);
  }
  
})();
