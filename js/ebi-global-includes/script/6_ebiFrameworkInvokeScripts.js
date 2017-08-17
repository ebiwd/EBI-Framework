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
  ebiFrameworkCookieBanner();
}

/* All scripts are automatically loaded, unless the page asked us not to.
 *   Configurable with a data attribute:
 *   <body data-ebiFrameworkInvokeScripts="false">
 **/
document.addEventListener("DOMContentLoaded", function(event) {
  var bodyData = document.body.dataset;
  if (bodyData["ebiFrameworkInvokeScripts"] != false) {
    ebiFrameworkInvokeScripts();
  }
});
