/* Copyright (c) EMBL-EBI 2016
   Maintainers: 
   Peter Walter (pwalter@ebi.ac.uk)
*/

/* DISABLED 
  * Close this comment to enable.
  * We comment out the entire function so this file is minified to nothing, when not needed.
(function downtimeMessage() {
  // user configuration at bottom of this file
  try {
    function showMessage(title, body, domains, paths) {
      var matchPath=false, matchDomain=false;
      var i, pattern;
      
      for (i=0; i<domains.length; i++) {
        // convert shell match to regular expression
        domains[i] = domains[i].replace('.', '\.'); 
        domains[i] = domains[i].replace('*', '.*');
        domains[i] = domains[i].replace('?','.');
        domains[i] = '^' + domains[i] + '$';

        // check if pathname matches
        pattern = new RegExp(domains[i], '');
        if (pattern.test(document.domain)) {
          matchDomain=true;
        }
      }
      for (i=0; i<paths.length; i++) {
        // convert shell match to regular expression
        paths[i] = paths[i].replace('.', '\.'); 
        paths[i] = paths[i].replace('*', '[^/]*');
        paths[i] = paths[i].replace('?','[^/]');
        paths[i] = '^' + paths[i] + '/?$';

        // check if pathname matches
        pattern = new RegExp(paths[i], '');
        if (pattern.test(document.location.pathname)) {
          matchPath=true;
        }
      }

      // abort if domain/path does not match
      if (!matchDomain || !matchPath) {
        return;
      }

      // build downtime message
      var downtime = document.createElement('div');
      downtime.className = 'downtime-message';
      downtime.innerHTML = '<div class="callout"><h5>' + title + '</h5><p><span class="downtime-note"></span> ' + body + '</p></div>';

      var hasBreadcrumb = document.getElementById('breadcrumb') !== null;
      // find content area (#main for D6-mit, #content for D7, #conetntsarea for migiated
      var contents = (document.getElementById('main') || document.getElementById('content') || document.getElementById('contentsarea'));
      if (hasBreadcrumb) {
        // place after breadcrumb
        var breadCrumb = document.getElementById('breadcrumb');
        contents.insertBefore(downtime, breadCrumb.nextSibling);
      }
      else {
        // place at top of content area
        contents.insertBefore(downtime, contents.childNodes[0]);
      }
    }

    // to display downtime message, create call to showmessage(string title, string body, array domains, array paths)
    // in body parameter, use <strong> to highlight dates, eg <strong>Tuesday, 14th May 20:00 BST</strong>
    showMessage(
     'Maintaining the Hinxton data centre, 26-30 August',
     'Due to planned essential maintenance at one of our data centres, some EMBL-EBI services may be unavailable or experience degraded performance. We thank you for your patience while we complete this work.',
     ['www.ebi.ac.uk'],
     ['/', '/services', '/research', '/training', '/industry', '/about', '/support/*', '/ebisearch/search.ebi', '/training/online']
    );
  }
  catch (err) {
  }
})();
*/
