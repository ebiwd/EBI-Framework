// Use the v1.3 data protection banner on older sites
function legacyDataProtectionBanner() {
  var localFrameworkVersion = '1.2'; // 1.1 or 1.2 or compliance or other
      // if you select compliance or other we will add some helpful
      // CSS styling, but you may need to add some CSS yourself
  var newDataProtectionNotificationBanner = document.createElement('script');
  newDataProtectionNotificationBanner.src = 'https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/js/ebi-global-includes/script/5_ebiFrameworkNotificationBanner.js?legacyRequest='+localFrameworkVersion;
  document.head.appendChild(newDataProtectionNotificationBanner);
  newDataProtectionNotificationBanner.onload = function() {
    ebiFrameworkRunDataProtectionBanner(); // invoke the banner
  };
}

function ebiFrameworkInvokeScripts() {
  ebiFrameworkExternalLinks();
  ebiFrameworkManageGlobalSearch();
  ebiFrameworkSearchNullError();
  ebiFrameworkHideGlobalNav();
  ebiFrameworkAssignImageByMetaTags();
  ebiFrameworkInsertEMBLdropdown();
  ebiFrameworkUpdateFoot();
  ebiFrameworkUpdateFooterMeta();
  ebiFrameworkIncludeScripts();
  // ebiFrameworkCookieBanner();
  legacyDataProtectionBanner();
}

/* All scripts are automatically loaded, unless the page asked us not to.
 *   Configurable with a data attribute:
 *   <body data-ebiFrameworkInvokeScripts="false">
 **/
document.addEventListener("DOMContentLoaded", function(event) {
  var bodyData = document.body.dataset;
  if (bodyData["ebiframeworkinvokescripts"] != "false") {
    ebiFrameworkInvokeScripts();
  }
});
