/* Copyright (c) EMBL-EBI 2016 */
(function temporaryFixes() {
  // TEMPORARY FIX
  // hide global navigation and search for /pdbe, /msd
/*
  (function hideGlobalStuff() {
    try {
      if (document.location.pathname.substr(0,5) === '/pdbe' || document.location.pathname.substr(0,4) === '/msd') {
        if (document.body.className.indexOf('no-global-nav') === -1) document.body.className += ' no-global-nav';
        if (document.body.className.indexOf('no-global-search') === -1) document.body.className += ' no-global-search';
      }
    }
    catch(err) {
    }
  })();
*/

  // TEMPORARY FIX
  // if on frontier.ebi.ac.uk ensure global nav links are pointing to frontier domain
  (function globalnavFix() {
    try {
      if (document.domain === 'frontier.ebi.ac.uk') {
        document.getElementById('services').innerHTML = "<a href=\"/services\">Services</a>";
        document.getElementById('research').innerHTML = "<a href=\"/research\">Research</a>";
        document.getElementById('training').innerHTML = "<a href=\"/training\">Training</a>";
        document.getElementById('industry').innerHTML = "<a href=\"/industry\">Industry</a>";
        (document.getElementById('about') || document.getElementById('about-us')).innerHTML = "<a href=\"/about\">About us</a>";
      }
    }
    catch (err) {}
  })();
})();

(function fixes() {

  // set text in copyright notice, adjust to current year
  // (function copyrightFix() {
  //   try {
  //     var d = new Date();
  //     document.getElementById('ebi-footer-meta').innerHTML = "" +
  //       "<p class=\"address\">EMBL-EBI, Wellcome Genome Campus, Hinxton, Cambridgeshire, CB10 1SD, UK &nbsp; &nbsp; +44 (0)1223 49 44 44</p>" +
  //       "<p>Copyright &copy; EMBL-EBI " + d.getFullYear() + " | EBI is an outstation of the <a href=\"http://www.embl.org\">European Molecular Biology Laboratory</a> | <a href=\"/about/terms-of-use\">Terms of use</a></p>";
  //   }
  //   catch (err) {}
  // })();

  // mark pdf/doc/txt links with link-pdf/link-doc/link-txt classes
  // exclude links with images
  // include only links to own domains
  (function externalLinks() {
    function isOwnDomain(url) {
      return (url.indexOf('//') === -1 ||
        url.indexOf('//www.ebi.ac.uk') !== -1 ||
        url.indexOf('//wwwdev.ebi.ac.uk') !== -1 ||
        url.indexOf('//srs.ebi.ac.uk') !== -1 ||
        url.indexOf('//frontier.ebi.ac.uk') !== -1 ||
        url.indexOf('//ftp.ebi.ac.uk') !== -1 ||
        url.indexOf('//intranet.ebi.ac.uk') !== -1 ||
        url.indexOf('//pdbe.org') !== -1 ||
        url.indexOf('//' + document.domain) !== -1);
    }
    function isFileType(url, type) {
      return url.indexOf(type, url.length-type.length)!==-1;
    }
    try {
      var alist = document.getElementsByTagName('a');
      var fileTypes = ['pdf', 'doc', 'txt'];
      var i, icon;
      for (i=0; i<alist.length; i++) {
        for (var type in fileTypes) {
          if (alist[i].innerHTML.indexOf('<span class="link-' + fileTypes[type] + '"></span>') === -1 && alist[i].innerHTML.indexOf('<img') === -1 && isFileType(alist[i].href, fileTypes[type]) && isOwnDomain(alist[i].href)) {
            icon = document.createElement('span');
            icon.className = 'link-' + fileTypes[type];
            alist[i].appendChild(icon);
          }
        }
      }
    }
    catch(err) {}
  })();

  // Disable the global search if a page defines a local search.
  // Can also be disable by adding class 'no-global-search' to the body element.
  (function manageGlobalSearch() {
    try {
      var hasLocalSearch = document.getElementById('local-search') !== null;
      var hasLocalEBISearch = document.getElementById('ebi_search') !== null;
      if (hasLocalSearch || hasLocalEBISearch) {
        document.body.className += ' no-global-search';
      } else {
        // If the page gets a global search, we specify how the dropdown box should be. #RespectMyAuthoriti
        var html = '<form id="global-search" name="global-search" action="/ebisearch/search.ebi" method="GET" class="large-8 large-push-2">' +
                      '<fieldset>' +
                        '<div class="input-group">' +
                          '<input type="text" name="query" id="global-searchbox" class="input-group-field" placeholder="Search all of EMBL-EBI">' +
                          '<div class="input-group-button">' +
                            '<input type="submit" name="submit" value="Search" class="button">' +
                            '<input type="hidden" name="db" value="allebi" checked="checked">' +
                            '<input type="hidden" name="requestFrom" value="global-masthead" checked="checked">' +
                          '</div>' +
                        '</div>' +
                      '</fieldset> ' +
                    '</form>';

        try {
          var gloablSearch = document.getElementById('search-global-dropdown');
          gloablSearch.innerHTML = html;
        } catch (err) {
          setTimeout(init, 500);
        }
      }
    }
    catch (err) {}
  })();

  // Add error alerts for 'no input' on search boxes.
  (function searchNullError() {
    try {
      var disabled = document.body.className.indexOf('no-search-error') !== -1;

      // Array of search box definition objects, specify inputNode, defaultText (optional, default ''), errorText (optional, default 'Please enter a search term')
      var searchBoxes = [
        { inputNode: document.getElementById('global-searchbox') }, // in global masthead
        { inputNode: document.getElementById('local-searchbox') }, // in local masthead
        { inputNode: document.body.className.indexOf('front') !== -1 ? document.getElementById('query') : null }, // on home page
        { inputNode: document.getElementById('people-groups') ? document.getElementById('people-groups').getElementsByTagName('input')[0] : null } // on people and group page
      ];

      if (!disabled) {
        for (searchBox in searchBoxes) {
          var searchInput = searchBoxes[searchBox].inputNode;
          var searchForm = (searchInput) ? searchInput.form : null;
          var searchInputDefault = searchBoxes[searchBox].defaultText || '';
          var searchError = searchBoxes[searchBox].errorText || 'Please enter a search term';
          var searchAction = (searchForm) ? searchForm.action : '';
          var isEbiSearch = searchAction.indexOf('/ebisearch/') !== -1;

          if (searchForm && searchInput && isEbiSearch) {
            // add reference to other items for onsubmit anonymous function
            searchForm.searchInput = searchInput;
            searchForm.searchInputDefault = searchInputDefault;
            searchForm.searchError = searchError;

            searchForm.onsubmit = function() {
              searchInput = this.searchInput;
              searchInputDefault = this.searchInputDefault;
              searchError = this.searchError;

              // Ensure input is trimmed
              searchInput.value = searchInput.value.trim();

              if (searchInput.value === searchInputDefault || searchInput.value === '') {
                alert(searchError);
                return false;
              }
            };

          }
        }
      }
    }
    catch (err) {}
  })();

  // Remove global-nav/global-nav-expanded from header/footer
  // if body.no-global-nav is set
  (function hideGlobalNav() {
    try {
      var hasGlobalMasthead = document.getElementById('global-masthead') !== null;
      var disabled = document.body.className.indexOf('no-global-nav') !== -1;
      var elem;

      if (hasGlobalMasthead && disabled) {
        if ((elem=document.getElementById('global-nav')) !== null) {
          elem.parentNode.removeChild(elem);
        }
        if ((elem=document.getElementById('global-nav-expanded')) !== null) {
          elem.parentNode.removeChild(elem);
        }
      }
    }
    catch (err) {}
  })();

  // Tap the location bar to scroll to the top
  // Disabled for v1.1 per https://github.com/ebiwd/EBI-Framework/issues/23
  // (function scrollMeUp() {
  //   var localMasthead = document.getElementById('local-masthead');
  //   localMasthead.onclick = function(e){
  //     if (e.target.nodeName == 'A')
  //       return;
  //     // if jQuery then do it all pretty like
  //     if (window.jQuery) {
  //       $('html,body').animate({
  //         scrollTop: 0
  //       }, 700);
  //     } else {
  //       window.scrollTo(0,0);
  //     }
  //   }
  // })();

  // Assign global nav background images through meta tags
  (function assignImageByMetaTags() {
    var localMasthead = document.getElementById('local-masthead');
    // check for both ebi: and ebi- formatted meta tags
    var localMastheadColor = document.querySelector("meta[name='ebi:localmasthead-color']") || document.querySelector("meta[name='ebi-localmasthead-color']");
    var localMastheadImage = document.querySelector("meta[name='ebi:localmasthead-image']") || document.querySelector("meta[name='ebi-localmasthead-image']");

    if (localMastheadColor != null) {
      localMasthead.style.backgroundColor = localMastheadColor.getAttribute("content");
      localMasthead.className += ' meta-background-color';
    }
    if (localMastheadImage != null) {
      localMasthead.style.backgroundImage = 'url(' + localMastheadImage.getAttribute("content") + ')';
      localMasthead.className += ' meta-background-image';
    }
  })();

})();


// Use the v1.3 data protection banner on older sites
function legacyDataProtectionBanner() {
  var localFrameworkVersion = '1.1'; // 1.1 or 1.2 or compliance or other
      // if you select compliance or other we will add some helpful
      // CSS styling, but you may need to add some CSS yourself
  var newDataProtectionNotificationBanner = document.createElement('script');
  newDataProtectionNotificationBanner.src = 'https://ebi.emblstatic.net/web_guidelines/EBI-Framework/v1.3/js/ebi-global-includes/script/5_ebiFrameworkNotificationBanner.js?legacyRequest='+localFrameworkVersion;
  document.head.appendChild(newDataProtectionNotificationBanner);
  newDataProtectionNotificationBanner.onload = function() {
    ebiFrameworkRunDataProtectionBanner(); // invoke the banner
  };
}
legacyDataProtectionBanner();
