// Injects the Data Protection notice onto sites
// For guidance on using: https://www.ebi.ac.uk/style-lab/websites/patterns/banner-data-protection.html
function createDataProtectionBanner() {
  var banner = document.createElement('div');
  var wrapper = document.createElement('div');
  var inner = document.createElement('div');

  // don't accidently create two banners
  if (document.getElementById("data-protection-banner") != null) {
    document.getElementById("data-protection-banner").remove();
  }

  banner.id = "data-protection-banner";
  banner.className = "cookie-banner";
  wrapper.className = "row";
  wrapper.innerHTML = "" +
    "<div class='columns medium-8 large-9'>" +
    dataProtectionSettings.message +
    " To find out more, see our <a target='_blank' href='" + dataProtectionSettings.link + "' class='white-color'>privacy policy</a>.</div>" +
    "<div class='columns medium-4 large-3 text-right'><a id='data-protection-agree' class=''>I agree, dismiss this banner</a></div>" +
    "";

  document.body.appendChild(banner);
  banner.appendChild(wrapper);

  openDataProtectionBanner();
}

function openDataProtectionBanner() {
  var height = document.getElementById('data-protection-banner').offsetHeight || 0;
  document.getElementById('data-protection-banner').style.display = 'block';
  document.body.style.paddingBottom = height+'px';

  document.getElementById('data-protection-agree').onclick = function() {
    closeDataProtectionBanner();
    return false;
  };
}

function closeDataProtectionBanner() {
  var height = document.getElementById('data-protection-banner').offsetHeight;
  document.getElementById('data-protection-banner').style.display = 'none';
  document.body.style.paddingBottom = '0';
  setCookie(dataProtectionSettings.cookieName, 'true', 90);
}

function setCookie(c_name, value, exdays) {
  var exdate = new Date();
  var c_value;
  exdate.setDate(exdate.getDate() + exdays);
  // c_value = escape(value) + ((exdays===null) ? "" : ";expires=" + exdate.toUTCString()) + ";domain=.ebi.ac.uk;path=/";
  // document.cookie = c_name + "=" + c_value;
  c_value = escape(value) + ((exdays===null) ? "" : ";expires=" + exdate.toUTCString()) + ";domain=" + document.domain + ";path=/";
  document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
  var i, x, y, ARRcookies=document.cookie.split(";");
  for (i=0; i<ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x = x.replace(/^\s+|\s+$/g,"");
    if (x===c_name) {
      return unescape(y);
    }
  }
}

var dataProtectionSettings =  new Object();

function runDataProtectionBanner() {
  try {
    dataProtectionSettings.message = 'This website uses cookies. By continuing to browse this site, you are agreeing to the use of our site cookies. We also collect some information [text goes here, please review and agree]. ';
    dataProtectionSettings.link = 'https://www.ebi.ac.uk/about/link-needed-to-data-protection';
    dataProtectionSettings.serviceId = 'ebi';
    dataProtectionSettings.dataProtectionVersion = '1.0';

    // If there's a div#data-protection-message-configuration, override defaults
    var divDataProtectionBanner = document.getElementById('data-protection-message-configuration');
    if (divDataProtectionBanner !== null) {
      if (typeof divDataProtectionBanner.dataset.message !== "undefined") {
        dataProtectionSettings.message = divDataProtectionBanner.dataset.message;
      }
      if (typeof divDataProtectionBanner.dataset.link !== "undefined") {
        dataProtectionSettings.link = divDataProtectionBanner.dataset.link;
      }
      if (typeof divDataProtectionBanner.dataset.serviceId !== "undefined") {
        dataProtectionSettings.serviceId = divDataProtectionBanner.dataset.serviceId;
      }
      if (typeof divDataProtectionBanner.dataset.dataProtectionVersion !== "undefined") {
        dataProtectionSettings.dataProtectionVersion = divDataProtectionBanner.dataset.dataProtectionVersion;
      }
    }

    dataProtectionSettings.cookieName = dataProtectionSettings.serviceId + "-v" + dataProtectionSettings.dataProtectionVersion + "-data-protection-accepted";

    // If this version of banner not accpeted, show it:
    if (getCookie(dataProtectionSettings.cookieName) != "true") {
      createDataProtectionBanner();
    }

  } catch(err) { setTimeout(runDataProtectionBanner, 100); }
}

function resetDataProtectionBanner() {
  document.cookie = dataProtectionSettings.cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=" + document.domain + ";path=/";
  runDataProtectionBanner();
}

// execute
runDataProtectionBanner();
