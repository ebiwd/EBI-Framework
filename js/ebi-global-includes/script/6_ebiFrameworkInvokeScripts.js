/**
 * All scripts are automatically loaded, unless the page asked us not to.
 * @example
 * Configurable with a data attribute:
 * <body data-ebiFrameworkInvokeScripts="false">
 */
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

document.addEventListener("DOMContentLoaded", function(event) {
  var bodyData = document.body.dataset;
  if (bodyData["ebiframeworkinvokescripts"] != "false") {
    ebiFrameworkInvokeScripts();
  }
});
