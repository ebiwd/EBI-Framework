/* Copyright (c) EMBL-EBI 2013
   Authors: 
   Peter Walter (pwalter@ebi.ac.uk)
*/

(function downtimeMessage() {
  // user configuration at bottom of this file
  try {
    /**
      * showMessage
      * param: string title
      *   html string to be placed inside p.downtime-title
      * param: string body
      *   html string to be placed inside p.downtime-message, will be prepended with 'Please note:'
      * param: array domains
      *   compared against document.location.pathname (ie starts with /, and has no query string)
      * param: array paths
      *   compared against document.domain
      */
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

      // replace *...* wrappers with <strong>...</strong>
      // replace _..._ wrappers with <em>...</em>
      body = body.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
      body = body.replace(/_(.*?)_/g, '<em>$1</em>');

      // build downtime message
      var downtime = document.createElement('div');
      downtime.className = 'downtime-message';
      downtime.innerHTML = '<div class="downtime-message-inner"><p class="downtime-title">' + title + '</p><p class="downtime-message"><span class="downtime-note">Please Note:</span> ' + body + '</p></div>';

      // create styles
      var css = 'div.downtime-message { font-size:100%; padding:9px } ' +
        '#contentsarea div.downtime-message { padding:0px } ' +
        'div.downtime-message-inner { border:1px solid #d9dadc; -moz-border-radius: 5px; -khtml-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px;' +
        'background:#edf5ea; padding:9px } ' +
        'div.downtime-message p { margin:0 } ' +
        'div.downtime-message p.downtime-title { font-style:italic } ' +
        'div.downtime-message p.downtime-message span.downtime-note { font-weight:bold } ' +
        'div.downtime-message p.downtime-message strong { color:#e33e3e; font-weight:bold }' +
        'div.downtime-message p.downtime-message em { font-style:italic }';
      var head = (document.head || document.getElementsByTagName('head')[0]);
      var styles = document.createElement('style');
      styles.type = 'text/css';
      if (styles.styleSheet){
        styles.styleSheet.cssText = css;
      } else {
        styles.appendChild(document.createTextNode(css));
      }
      head.appendChild(styles);

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
    
/* start of user configuration */   
/*
    // to display downtime message, create call to showmessage(string title, string body, array domains, array paths)
    // in body parameter, use * to highlight dates, eg *Tuesday, 14th May 20:00 BST*
    showMessage(
      'Thursday, 16th October 2014',
      'Between *20th October 2014* and *23rd December 2014* EMBL-EBI will be ' +
        'consolidating its web infrastructure into a single data centre. Services ' +
        'are expected to continue operating as normal during this period, but ' + 
        'some disruption may be experienced.',
      ['www.ebi.ac.uk'],
      ['/', '/services', '/research', '/training', '/industry', '/about', '/support/*', '/ebisearch/search.ebi']
    );
*/
/* end of user configuration */
  }
  catch (err) {
  }
})();
