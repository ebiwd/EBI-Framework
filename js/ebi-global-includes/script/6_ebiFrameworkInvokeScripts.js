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

// init
document.addEventListener("DOMContentLoaded", function(event) {
  ebiFrameworkInvokeScripts();
});
