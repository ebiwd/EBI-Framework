/* Copyright (c) EMBL-EBI 2017 */
(function fixes() {
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
                            '<input type="hidden" name="requestFrom" value="masthead-black-bar" checked="checked">' +
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
      var hasGlobalMasthead = document.getElementById('masthead-black-bar') !== null;
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
  //   var masthead = document.getElementById('masthead');
  //   masthead.onclick = function(e){
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
    var masthead = document.getElementById('masthead');
    // check for both ebi: and ebi- formatted meta tags
    var mastheadColor = document.querySelector("meta[name='ebi:masthead-color']") || document.querySelector("meta[name='ebi-masthead-color']");
    var mastheadImage = document.querySelector("meta[name='ebi:masthead-image']") || document.querySelector("meta[name='ebi-masthead-image']");

    if (mastheadColor != null) {
      masthead.style.backgroundColor = mastheadColor.getAttribute("content");
      masthead.className += ' meta-background-color';
    }
    if (mastheadImage != null) {
      masthead.style.backgroundImage = 'url(' + mastheadImage.getAttribute("content") + ')';
      masthead.className += ' meta-background-image';
    }
  })();

   // Insert EMBL dropdown menu
  (function insertEMBLdropdown() {

    try {
      // remove any current dropdown
      if ((elem=document.getElementById('embl-dropdown')) !== null) {
        document.getElementById('embl-dropdown').remove();
      }

      var dropdownDiv = document.createElement("div");
      dropdownDiv.innerHTML = '<div id="embl-dropdown" class="embl-dropdown dropdown-pane bottom" data-dropdown>' +
                '<p>EMBL-EBI in Hinxton is one of five EMBL locations across europe.<br/> <a href="//www.ebi.ac.uk/about" class="small readmore">More about EMBL-EBI</a></p>' +
                '<h6>Connect to another EMBL location</h6>' +
                '<div class="small-collapse small-up-2 padding-bottom-large clearfix">' +
                  '<div class="column padding-bottom-medium">' +
                    '<a href="http://www.embl.fr/" class="">Grenoble</a>' +
                    '<div class="small">Structural Biology</div>' +
                  '</div>' +
                  '<div class="column padding-bottom-medium">' +
                    '<a href="http://www.embl-hamburg.de/" class="">Hamburg</a>' +
                    '<div class="small">Structural Biology</div>' +
                  '</div>' +
                  '<div class="column padding-bottom-medium">' +
                    '<a href="http://www.embl.de/" class="">Heidelberg</a>' +
                    '<div class="small">Main Laboratory</div>' +
                  '</div>' +
                  '<div class="column padding-bottom-medium">' +
                    '<a href="http://www.embl.it/" class="">Monterotondo</a>' +
                    '<div class="small">Mouse Biology</div>' +
                  '</div>' +
                '</div>' +
                '<p><a href="http://embl.org/" class="button readmore">Or learn more about EMBL</a></p>' +
              '</div>';
      document.getElementById("masthead-black-bar").appendChild(dropdownDiv);
      // We don't invoke the dropdown here, as that method depends on how you're using the Framework
    }
    catch(err) {};

  })();

})();

(function updateFoot() {
    var html = '' + '<div class="columns small-6 medium-2 "> ' + ' <a href="//www.ebi.ac.uk" title="EMBL-EBI"><span class="ebi-logo"></span></a> ' + ' <ul> ' + ' </ul> ' + ' </div> ' + ' ' + ' <div class="columns small-6 medium-2 "> ' + ' <h5 class="services"><a class="services-color" href="//www.ebi.ac.uk/services">Services</a></h5> ' + ' <ul> ' + ' <li class="first"><a href="//www.ebi.ac.uk/services">By topic</a></li> ' + ' <li><a href="//www.ebi.ac.uk/services/all">By name (A-Z)</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/support">Help &amp; Support</a></li> ' + ' </ul> ' + ' </div> ' + ' ' + ' <div class="columns small-6 medium-2 "> ' + ' <h5 class="research"><a class="research-color" href="//www.ebi.ac.uk/research">Research</a></h5> ' + ' <ul> ' + ' <li><a href="//www.ebi.ac.uk/research/publications">Publications</a></li> ' + ' <li><a href="//www.ebi.ac.uk/research/groups">Research groups</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/research/postdocs">Postdocs</a> &amp; <a href="//www.ebi.ac.uk/research/eipp">PhDs</a></li> ' + ' </ul> ' + ' </div> ' + ' ' + ' <div class="columns small-6 medium-2 "> ' + ' <h5 class="training"><a class="training-color" href="//www.ebi.ac.uk/training">Training</a></h5> ' + ' <ul> ' + ' <li><a href="//www.ebi.ac.uk/training/handson">Train at EBI</a></li> ' + ' <li><a href="//www.ebi.ac.uk/training/roadshow">Train outside EBI</a></li> ' + ' <li><a href="//www.ebi.ac.uk/training/online">Train online</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/training/contact-us">Contact organisers</a></li> ' + ' </ul> ' + ' </div> ' + ' ' + ' <div class="columns small-6 medium-2 "> ' + ' <h5 class="industry"><a class="industry-color" href="//www.ebi.ac.uk/industry">Industry</a></h5> ' + ' <ul> ' + ' <li><a href="//www.ebi.ac.uk/industry/private">Members Area</a></li> ' + ' <li><a href="//www.ebi.ac.uk/industry/workshops">Workshops</a></li> ' + ' <li><a href="//www.ebi.ac.uk/industry/sme-forum"><abbr title="Small Medium Enterprise">SME</abbr> Forum</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/industry/contact">Contact Industry programme</a></li> ' + ' </ul> ' + ' </div> ' + ' ' + ' <div class="columns small-6 medium-2 "> ' + ' <h5 class="about"><a class="ebi-color" href="//www.ebi.ac.uk/about">About EMBL-EBI</a></h5> ' + ' <ul> ' +
    ' <li><a href="//www.ebi.ac.uk/about/contact">Contact us</a> ' +
    ' <li><a href="//www.ebi.ac.uk/about/events">Events</a></li> ' +
    ' <li><a href="//www.ebi.ac.uk/about/jobs" title="Jobs, postdocs, PhDs...">Jobs</a></li> ' +
    ' <li class="first"><a href="//www.ebi.ac.uk/about/news">News</a></li> ' +
    ' <li><a href="//www.ebi.ac.uk/about/people">People &amp; groups</a></li> ' +
    ' </ul> ' + ' </div>' + '';

    function init() {
        try {
            var foot = document.getElementById('global-nav-expanded');
            foot.innerHTML = html;
        } catch (err) {
            setTimeout(init, 500);
        }
    }
    init();
})();

(function updateFooterMeta() {
    var d = new Date();
    var html = '<div class="columns">' + '<p class="address">EMBL-EBI, Wellcome Genome Campus, Hinxton, Cambridgeshire, CB10 1SD, UK. +44 (0)1223 49 44 44</p> <p class="legal">Copyright &copy; EMBL-EBI ' + d.getFullYear() + ' | EMBL-EBI is <a href="http://www.embl.org/">part of the European Molecular Biology Laboratory</a> | <a href="//www.ebi.ac.uk/about/terms-of-use">Terms of use</a>' +
    '<a class="readmore float-right" href="http://intranet.ebi.ac.uk">Intranet</a>' +
    '</p>' + '</div>';

    function init() {
        try {
            var foot = document.getElementById('ebi-footer-meta');
            foot.innerHTML = html;
        } catch (err) {
            setTimeout(init, 500);
        }
    }
    init();
})();
(function includeScripts() {
    var requireScripts = ['//www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/js/script.js', '//www.ebi.ac.uk/web_guidelines/js/downtime.js?' + Math.round(new Date().getTime() / 3600000)];

    function init() {
        try {
            var existingScripts = document.getElementsByTagName('script');
            var gotScript, i, j, putScript;
            for (j = 0; j < requireScripts.length; j++) {
                for (gotScript = false, i = 0; i < existingScripts.length; i++)
                    if (existingScripts[i].src.indexOf(requireScripts[j]) !== -1)
                        gotScript = true;
                if (!gotScript) {
                    putComment = document.createComment(requireScripts[j] + ' automatically inserted');
                    putScript = document.createElement('script');
                    putScript.type = 'text/javascript';
                    putScript.src = requireScripts[j];
                    document.body.appendChild(putComment);
                    document.body.appendChild(putScript);
                }
            }
        } catch (err) {
            setTimeout(init, 500);
        }
    }
    init();
})();

(function cookieBanner() {
   function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    var c_value;
    exdate.setDate(exdate.getDate() + exdays);
    c_value = escape(value) + ((exdays===null) ? "" : ";expires=" + exdate.toUTCString()) + ";domain=.ebi.ac.uk;path=/";
    document.cookie = c_name + "=" + c_value;
    c_value = escape(value) + ((exdays===null) ? "" : ";expires=" + exdate.toUTCString()) + ";domain=" + document.domain + ";path=/";
    document.cookie = c_name + "=" + c_value;
  }

  function getCookie(c_name) {
    var i, x, y, ARRcookies=document.cookie.split(";");
    for (i=0; i<ARRcookies.length; i++)
    {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
      x = x.replace(/^\s+|\s+$/g,"");
      if (x===c_name) {
        return unescape(y);
      }
    }
  }

  function createStyles() {
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';
    var css = "" +
    "  #cookie-banner {position:fixed;background-color:#111;width:100%;padding:.75rem;left:0;bottom:0;color:#eee;}" +
    "  #cookie-banner a {color:#fff;}" +
    "  .text {margin-right:2em;}";

    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  }

  function createBanner() {
    var banner = document.createElement('div');
    var wrapper = document.createElement('div');
    var inner = document.createElement('div');

    banner.id = "cookie-banner";
    wrapper.className = "row";
    wrapper.innerHTML = "" +
    "  <div class='text'>This website uses cookies. By continuing to browse this site, you are agreeing to the use of our site cookies. " +
    "  To find out more, see our <a href='//www.ebi.ac.uk/about/terms-of-use'>Terms of Use</a>.</div>" +
    "  <div id='cookie-dismiss'>  <button class='close-button' style='top: 0.3rem; color:#fff;' aria-label='Close alert' type='button'><span aria-hidden='true'>&times;</span></button></div>" +
    "";

    document.body.appendChild(banner);
    banner.appendChild(wrapper);
  }

  function openBanner() {
    var height = document.getElementById('cookie-banner').offsetHeight;
    document.getElementById('cookie-banner').style.display = 'block';
    document.body.style.paddingBottom = height+'px';
  }

  function closeBanner() {
    var height = document.getElementById('cookie-banner').offsetHeight;
    document.getElementById('cookie-banner').style.display = 'none';
    document.body.style.paddingBottom = '0';
  }

  function init() {
    try {
      if (getCookie('cookies-accepted') !== 'true') {
        createStyles();
        createBanner();
        openBanner();

        setCookie('cookies-accepted', 'true', 90); // show cookie message only once

        document.getElementById('cookie-dismiss').onclick = function() {
          closeBanner();
          return false;
        };
      }
    }
    catch(err) {
      setTimeout(init, 100);
    }
  }

  init();

})();
