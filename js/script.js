/* Copyright (c) EMBL-EBI 2013
   Authors: 
   Peter Walter (pwalter@ebi.ac.uk)
*/

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
  
  // TEMPORARY FIX
  // ensure page nav links are pointing to frontier domain
/*
  (function linkFix() {
    try {
      var alist = document.getElementsByTagName('a');
      for (i=0; i<alist.length; i++) {
        if (alist[i].href=="http://www.ebi.ac.uk" || alist[i].href=="http://www.ebi.ac.uk/" || alist[i].href=="/") 
          alist[i].href="http://frontier.ebi.ac.uk";

        if (alist[i].href=="http://www.ebi.ac.uk/services" || alist[i].href=="/services") 
          alist[i].href="http://frontier.ebi.ac.uk/services";
        if (alist[i].href=="http://www.ebi.ac.uk/research" || alist[i].href=="/research") 
          alist[i].href="http://frontier.ebi.ac.uk/research";
        if (alist[i].href=="http://www.ebi.ac.uk/training" || alist[i].href=="/training") 
          alist[i].href="http://frontier.ebi.ac.uk/training";
        if (alist[i].href=="http://www.ebi.ac.uk/training/online" || alist[i].href=="/training/online") 
          alist[i].href="http://frontier.ebi.ac.uk/training/online";
        if (alist[i].href=="http://www.ebi.ac.uk/industry" || alist[i].href=="/industry") 
          alist[i].href="http://frontier.ebi.ac.uk/industry";
        if (alist[i].href=="http://www.ebi.ac.uk/about" || alist[i].href=="/about") 
          alist[i].href="http://frontier.ebi.ac.uk/about";

        if (alist[i].href.indexOf("//www.ebi.ac.uk/about/cookies") !== -1)
          alist[i].href="http://frontier.ebi.ac.uk/about/cookies";
        if (alist[i].href.indexOf("//www.ebi.ac.uk/about/privacy") !== -1)
          alist[i].href="http://frontier.ebi.ac.uk//about/privacy";
      }
    }
    catch(err) {}
  })();
*/
})();

(function fixes() {
  // extend string prototype
  if (!String.prototype.trim) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, '');
    };
  }
  
  // set text in copyright notice, adjust to current year
  (function copyrightFix() {
    try {
      var d = new Date();
      document.getElementById('ebi-footer-meta').innerHTML = "" +
        "<p class=\"address\">EMBL-EBI, Wellcome Trust Genome Campus, Hinxton, Cambridgeshire, CB10 1SD, UK &nbsp; &nbsp; +44 (0)1223 49 44 44</p>" +
        "<p>Copyright &copy; EMBL-EBI " + d.getFullYear() + " | EBI is an outstation of the <a href=\"http://www.embl.org\">European Molecular Biology Laboratory</a> | <a href=\"/about/terms-of-use\">Terms of use</a></p>" +
        "";
    }
    catch (err) {}
  })();

/* deprecated by WGC 30/04/13
  // mark all external link with class "external"
  // exclude links with images
  // include only links outside of own domain
*/
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
/*
        if (alist[i].innerHTML.indexOf('<span class="external"></span>') === -1 && alist[i].innerHTML.indexOf('<img') === -1 && !isOwnDomain(alist[i].href)) {
          icon = document.createElement('span');
          icon.className = 'external';
          alist[i].appendChild(icon);
        }
*/
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

  // insert markup into global-masthead for global search
  // append body class to identify local-search, inpage-search or global-search
  // intertion can be disabled with body.no-global-search
  // (function insertGlobalSearch() {
  //   try {
  //     var disabled = document.body.className.indexOf('no-global-search') !== -1;

  //     var hasGlobalMasthead = document.getElementById('global-masthead') !== null;

  //     var hasLocalSearch = document.getElementById('local-search') !== null;
  //     var hasInPageSearch = (document.getElementById('ebi_search') || document.getElementById('people-groups')) !== null

  //     var insertGlobalSearch = hasGlobalMasthead && !hasLocalSearch && !hasInPageSearch && !disabled;
      
  //     document.body.className += hasLocalSearch ? ' local-search' : '';
  //     document.body.className += hasInPageSearch ? ' inpage-search' : '';
  //     document.body.className += insertGlobalSearch ? ' global-search' : '';

  //     if (insertGlobalSearch) {
  //       // create the form
  //       var globalSearchForm = (document.getElementById("global-search") || document.createElement('form'));
  //       globalSearchForm.id = "global-search";
  //       globalSearchForm.name = "global-search";
  //       globalSearchForm.action = "/ebisearch/search.ebi";
  //       globalSearchForm.method = "GET";
  //       globalSearchForm.innerHTML = "" +
  //         "<fieldset>" +
  //         "  <label>" +
  //         "    <input type='text' name='query' id='global-searchbox'>" +
  //         "  </label>" +
  //         "  <input type='submit' name='submit' value='' class='submit' />" +
  //         "  <input type='hidden' name='db' value='allebi' checked='checked'>" +
  //         "  <input type='hidden' name='requestFrom' value='global-masthead' checked='checked'>" +
  //         "</fieldset>" +
  //         "";


  //       // insert into global-masthead
  //       var globalMasthead = document.getElementById('global-masthead');
  //       globalMasthead.insertBefore(globalSearchForm, globalMasthead.firstChild);
  //     }
  //   }
  //   catch (err) {}
  // })();

  // add error alerts for 'no input' on search boxes
  (function searchNullError() {
    try {
      var disabled = document.body.className.indexOf('no-search-error') !== -1;

      // array of search box definition objects, specify inputNode, defaultText (optional, default ''), errorText (optional, default 'Please enter a search term')
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

              // ensure input is trimmed
              searchInput.value = searchInput.value.trim();
              
              if (searchInput.value === searchInputDefault || searchInput.value === '') {
                alert(searchError);
                return false;
              }
            };

/*
            // add hint
            searchInput.onfocus = function() {
              if (this.value === searchInputDefault) {
                this.value = '';
              }
              this.style.color = '#000';
            }
            searchInput.onblur = function() {
              if (this.value === '') {
                this.value = searchInputDefault;
              }
              this.style.color = '#ccc';
            }
            searchInput['onblur'].call(searchInput);
*/
          }
        }
      }
    }
    catch (err) {}
  })();
  
  // removed global-nav/global-nav-expanded from header/footer
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
  
  // replaces old logo pattern
  // sets first and last classes on global-navigation
  // (function fixGlobalNav() {
/*
    try {
      logo = document.getElementById('global-masthead').getElementsByTagName('p')[0]; // old logo pattern 
      if (typeof logo !== 'undefined') {
        newlogo = document.createElement('a');
        newlogo.href="/";
        newlogo.title="Go to the EMBL-EBI homepage";
        newlogo.innerHTML = '<img src="//www.ebi.ac.uk/web_guidelines/images/logos/EMBL-EBI/EMBL_EBI_Logo_white.png" alt="EMBL European Bioinformatics Institute">';
        logo.parentNode.replaceChild(newlogo,logo);
      }
    }
    catch(err) {};
*/

  //   try {
  //     var first = document.getElementById('services');
  //     var last = (document.getElementById('about') || document.getElementById('about-us'));

  //     if (first.className.indexOf('first') === -1) {
  //       first.className += ' first';
  //     }
  //     if (last.className.indexOf('last') === -1) {
  //       last.className += ' last';
  //     }
  //   }
  //   catch(err) {}
  // })();

  // (function fixLocalNav() {
  //   try {
  //     var hasLocalNavigation = document.getElementById('local-nav') !== null;
      
  //     if (hasLocalNavigation) {
  //       var items = document.getElementById('local-nav').getElementsByTagName('li');
  //       var firstItem = null, lastItem = null, firstFunctional = null, lastFunctional = null;

  //       for (var i=0; i<items.length; i++) {
  //         if (items[i].className.indexOf('functional') !== -1) {
  //           firstFunctional = firstFunctional || items[i];
  //           lastFunctional = items[i];
  //         }
  //         else {
  //           firstItem = firstItem || items[i];
  //           lastItem = items[i];
  //         }
  //         if (items[i].className.indexOf('first') !== -1) {
  //           items[i].className = items[i].className.replace(' first','');
  //         }
  //         if (items[i].className.indexOf('last') !== -1) {
  //           items[i].className = items[i].className.replace(' last','');
  //         }
  //       }
        
  //       if (firstItem.className.indexOf('first') === -1) {
  //         firstItem.className += ' first';
  //       }
  //       if (lastItem.className.indexOf('last') === -1) {
  //         lastItem.className += ' last';
  //       }
  //       if (firstFunctional.className.indexOf('last') === -1) {
  //         firstFunctional.className += ' last';
  //       }
  //       if (lastFunctional.className.indexOf('first') === -1) {
  //         lastFunctional.className += ' first';
  //       }
  //     }
  //   }
  //   catch (err) {}
  // })();

  // watches to see if contentspane is wider than local-masthead, and sets min-width appropriately
  // can be disabled with body.no-content-width-fix
  // (function setMitigationMinWidth() {
  //   try {
  //     var hasLocalMasthead = document.getElementById('local-masthead') !== null;
  //     var hasContentsPane = document.getElementById('contentspane') !== null;
  //     var disabled = document.body.className.indexOf('no-content-width-fix') !== -1;
      
  //     function checkMitigationMinWidth() {
  //       if (document.getElementById('contentspane').clientWidth > document.getElementById('local-masthead').clientWidth) {
  //         document.body.style.minWidth = document.getElementById('contentspane').clientWidth + 'px';
  //       }
  //     }
      
  //     if (!disabled && hasLocalMasthead && hasContentsPane) {
  //       checkMitigationMinWidth(); // run now
  //       if (window.addEventListener) { 
  //         window.addEventListener('resize', checkMitigationMinWidth, false);
  //       }
  //       else {
  //         window.attachEvent('onresize', checkMitigationMinWidth); // IE<9 compatiblilty
  //       }
  //     }
  //   }
  //   catch(err) {}
  // })();
  
  (function browserIdentify() {
    if (document.all && !document.addEventListener) { // <IE8
      if (document.body.parentNode.className.indexOf('oldie') === -1) {
        document.body.parentNode.className += ' oldie';
      }
    }
  })();

  // tap the location bar to scroll to the top
  (function scrollMeUp() {
    var localMasthead = document.getElementById('local-masthead');
    localMasthead.onclick = function(e){
      if (e.target.nodeName == 'A')
        return;
      // if jQuery then do it all pretty like
      if (window.jQuery) {  
        $('html,body').animate({
          scrollTop: 0
        }, 700);
      } else {
        window.scrollTo(0, 0);
      }
    }
  })();

  if (window.jQuery) {  
    // Link overlay images
    $(function() {
      $('.with-overlay').click(function(e) {
        var href = $(this).find('a:first').attr('href') || '';
        if (href.length > 0) {
          window.location.href = href;
        }
      })
    });

    // Responsive support for tables
    // Clone the class from a parent TH to any child TD
    jQuery('table.responsive-table').each( function() {
      var columnsToAppend = jQuery(this).find('th');
      console.log(columnsToAppend.length);
      for (var i = 0; i < columnsToAppend.length; i++) {
        if (jQuery(columnsToAppend[i]).attr('class')) {
          var position = i + 1;
          jQuery(this).find('td:nth-child('+position+')').addClass(jQuery(columnsToAppend[i]).attr('class'));
        }
      };
    });

    // Smooth scroll anchor links for jQuery users
    $(function() {
      $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 1000);
            return false;
          }
        }
      });
    });
  }


  
})();
