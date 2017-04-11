/*  Copyright (c) EMBL-EBI 2017
    Authors:
      Ken Hawkins (khawkins@ebi.ac.uk)

    For sites that just need the EBI styles added, this code injects the core EBI Visual Framework:
      - CSS and JS
      - HMTL for the header and footer

    In practice it allows a site maintainer to EBI-ify a site by adding two lines of JS, the script and then invoke it:

      <!-- This should go near the top of the <head> -->
      <script defer="defer" src="injectEBIFramework.js"></script>
      <script type="text/javascript">injectEBIFramework();</script>

    Note that this is an early release and -- if the script proves popular -- more features are planned,
    such as paramaters to allow the Foundation JS or header.
*/

function injectEBIFramework() {

  // make sure jQuery is loaded
  if(!window.jQuery) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
    putComment = document.createComment(script.src + ' automatically inserted');
    document.getElementsByTagName('head')[0].appendChild(putComment);
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  function executeFoundation() {
    try {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = '$(document).ready(function() { $(document).foundation(); $(document).foundationExtendEBI(); });';
      document.body.appendChild(script);

      buildEBIHtml();
    } catch (err) {
      setTimeout(executeFoundation, 500);
    }
  }

  (function includeScripts() {
    var requireScripts = ['//www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/libraries/foundation-6/js/foundation.js',
                          '//www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/js/foundationExtendEBI.js',
                          '//www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/js/foot.js'];
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
            document.getElementsByTagName('head')[0].appendChild(putComment);
            document.getElementsByTagName('head')[0].appendChild(putScript);
          }
        }
        // once we know foundation is present
        executeFoundation();
      } catch (err) {
        setTimeout(init, 500);
      }
    }
    init();
  })(); // END function includeScripts


  (function includeStyles() {
    var requireStyles = ['//www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/css/theme-embl-petrol.css',
                         '//www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/css/ebi-global.css',
                         '//www.ebi.ac.uk/web_guidelines/EBI-Framework/v1.2/libraries/foundation-6/css/foundation.css',
                         '//www.ebi.ac.uk/web_guidelines/EBI-Icon-fonts/v1.2/fonts.css'];

    function init() {
      try {
        var existingStyles = document.getElementsByTagName('link') + [];
        var j, putStyle;
        for (j = 0; j < requireStyles.length; j++) {
          putComment = document.createComment(requireStyles[j] + ' automatically inserted');
          putStyle = document.createElement('link');
          putStyle.type = 'text/css';
          putStyle.media = 'all';
          putStyle.rel = 'stylesheet';
          putStyle.href = requireStyles[j];
          document.head.appendChild(putComment);
          document.head.appendChild(putStyle);
        }
      } catch (err) {
        setTimeout(init, 500);
      }
    }
    init();
  })(); // END function includeStyles


  function buildEBIHtml() {
    // Wait for jQuery to load and start building content
    $(document).ready(function() {

      // Prepare content
      var EBIHeader = '<div id="skip-to">' +
                        '<ul>' +
                          '<li><a href="#content">Skip to main content</a></li>' +
                          '<li><a href="#local-nav">Skip to local navigation</a></li>' +
                          '<li><a href="#global-nav">Skip to EBI global navigation menu</a></li>' +
                          '<li><a href="#global-nav-expanded">Skip to expanded EBI global navigation menu (includes all sub-sections)</a></li>' +
                        '</ul>' +
                      '</div>' +
                      '<div>' +
                        '<div id="local-masthead">' +
                          '<header>' +
                            '<div id="global-masthead" class="clearfix">' +
                              '<!--This has to be one line and no newline characters-->' +
                              '<a href="//www.ebi.ac.uk/" title="Go to the EMBL-EBI homepage"><span class="ebi-logo"></span></a>' +
                              '<nav>' +
                                '<div class="row">' +
                                  '<ul id="global-nav" class="menu">' +
                                    '<!-- set active class as appropriate -->' +
                                    '<li class="home-mobile"><a href="//www.ebi.ac.uk"></a></li>' +
                                    '<li class="home"><a href="//www.ebi.ac.uk">EMBL-EBI</a></li>' +
                                    '<li class="services"><a href="//www.ebi.ac.uk/services">Services</a></li>' +
                                    '<li class="research"><a href="//www.ebi.ac.uk/research">Research</a></li>' +
                                    '<li class="training"><a href="//www.ebi.ac.uk/training">Training</a></li>' +
                                    '<li class="about"><a href="//www.ebi.ac.uk/about">About us</a></li>' +
                                    '<li class="search">' +
                                      '<a href="#" data-toggle="search-global-dropdown"><span class="show-for-small-only">Search</span></a>' +
                                      '<div id="search-global-dropdown" class="dropdown-pane" data-dropdown data-options="closeOnClick:true;">' +
                                        '<form id="global-search" name="global-search" action="/ebisearch/search.ebi" method="GET">' +
                                          '<fieldset>' +
                                            '<div class="input-group">' +
                                              '<input type="text" name="query" id="global-searchbox" class="input-group-field" placeholder="Search all of EMBL-EBI">' +
                                              '<div class="input-group-button">' +
                                                '<input type="submit" name="submit" value="Search" class="button">' +
                                                '<input type="hidden" name="db" value="allebi" checked="checked">' +
                                                '<input type="hidden" name="requestFrom" value="global-masthead" checked="checked">' +
                                              '</div>' +
                                            '</div>' +
                                          '</fieldset>' +
                                        '</form>' +
                                      '</div>' +
                                    '</li>' +
                                    '<li class="float-right show-for-medium embl-selector">' +
                                      '<button class="button float-right" type="button" data-toggle="embl-dropdown">Hinxton</button>' +
                                      '<!-- The dropdown menu will be programatically added by script.js -->' +
                                    '</li>' +
                                  '</ul>' +
                                '</div>' +
                              '</nav>' +
                            '</div>' +
                            // '<div class="masthead row">' +
                            //   '<!-- local-title -->' +
                            //   '<div class="columns medium-7" id="local-title">' +
                            //     '<h1><a href="//ebiwd.github.io/EBI-Pattern-library" title="Back to EBI Pattern library homepage">EMBL Weekly news dashbaord</a></h1>' +
                            //   '</div>' +
                            //   '<!-- /local-title -->' +

                            //   '<!-- local-nav -->' +
                            //       '<nav >' +
                            //         '<ul class="dropdown menu float-left" data-description="navigational" data-dropdown-menu>' +
                            //           '<li class="active"><a href="//ebiwd.github.io/EBI-Pattern-library/" class="active">Dashboard</a></li>' +
                            //         '</ul>' +
                            //       '</nav>' +
                            //   '<!-- /local-nav -->' +
                            // '</div>' +
                          '</header>' +

                          '</div>' +
                      '</div>';


      var EBIFooter = '<div id="global-footer">' +
                      '<nav id="global-nav-expanded" class="row">' +
                        '<!-- Footer will be automatically inserted by footer.js -->' +
                      '</nav>' +
                      '<section id="ebi-footer-meta" class="row">' +
                        '<!-- Footer meta will be automatically inserted by footer.js -->' +
                      '</section>' +
                    '</div>';

      // Header
      $('body').prepend(EBIHeader);

      // Footer
      if ($('footer').length > 0) {
        $('footer').append(EBIFooter);
      } else {
        $('body').append(EBIFooter);
      }

    });
  }


} // END function injectEBIFramework
