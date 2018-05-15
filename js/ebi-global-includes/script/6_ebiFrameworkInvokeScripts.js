/**
 * All scripts are automatically loaded, unless the page asked us not to.
 * @example
 * Configurable with a data attribute:
 * <body data-ebiFrameworkInvokeScripts="false">
 */
function ebiFrameworkInvokeScripts() {
  ebiFrameworkPopulateBlackBar();
  ebiFrameworkActivateBlackBar();
  ebiFrameworkExternalLinks();
  ebiFrameworkManageGlobalSearch();
  ebiFrameworkSearchNullError();
  ebiFrameworkHideGlobalNav();
  ebiFrameworkAssignImageByMetaTags();
  ebiFrameworkInsertEMBLdropdown();
  ebiFrameworkUpdateFoot();
  ebiFrameworkUpdateFooterMeta();
  ebiFrameworkIncludeAnnouncements();
  ebiFrameworkRunDataProtectionBanner();
}

document.addEventListener("DOMContentLoaded", function(event) {
  var bodyData = document.body.dataset;
  // document.body.dataset not supported in < ie10
  if (isIE () && isIE () <= 10) { bodyData = []; }
  if (bodyData["ebiframeworkinvokescripts"] != "false") {
    ebiFrameworkInvokeScripts();
  }
});
