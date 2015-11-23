// This JS adds responsive menus.
// It's not ideal MVF, but we have to do it like this 
// as we can't modify the source HTML as this is an interim fix.

// PENDING Qs...
// - Lock orientation of screen? https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation

// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//   jQuery('body').addClass('mobile-device');
//   runResponsiveGlobal();
// }


// function runResponsiveGlobal() { // only run if this is a "mobile device"

  // Check for SVG support
  var img = new Image();
  img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==';
  if (img.width == 1 && img.height == 1) { jQuery('html').addClass('svg'); }

  // Attempt to fix zoom on older small screen devices (android 2.3.6?)
  if (document.documentElement.clientWidth < 480) { 
    document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
  }

  // -------------
  // BEGIN Basic Menu Structure
  // 
      // Define the HTML we want to add.
      // We try to do it a little better by defining all our new HTML as vars...
      var newNavMasthead = '<div id="masthead-mobile">' +
                           '<a href="/services" id="masthead-mobile-services" class="icon icon-generic" data-icon="(">Services</a>' +
                           '<a href="/research" id="masthead-mobile-research" class="icon icon-generic" data-icon=")">Research</a>' +
                           '<a href="/training" id="masthead-mobile-training" class="icon icon-generic" data-icon="t">Training</a>' +
                           '<a href="/about" id="masthead-mobile-about"    class="icon icon-generic" data-icon="i">About</a>' +
                           '<a href="#" id="masthead-mobile-search"   class="icon icon-functional flyout-nav" data-icon="1">Search</a>' +
                           '</div>';
      var newLocalnav    = '<div id="local-nav-mobile" class="grid_24">' +
                           '<a href="#" id="more-in-this-section" class="flyout-nav">More in this section <span class="arrow down"></span></a>' +
                           '</div>';
      var newSubnav      = '<div id="newSubnav-nav-mobile" class="">' +
                           '<a href="#" id="more-in-this-page" class="flyout-nav"><span class="label">More in </span> <span class="arrow down black"></span></a>' +
                           '</div>';
      var newLocalSearchButton = '<div id="local-search-mobile">' +
                           '<a href="#" id="masthead-mobile-search-local"   class="icon icon-functional flyout-nav" data-icon="1">Search</a>' +
                           '</div>';

      // inject our content
      jQuery('#global-masthead').append(newNavMasthead);
      jQuery('#local-nav').parent().prepend(newLocalnav);

      // determine active section for the first level nav icons
      //var activeTrail = '#masthead-mobile-' + window.location.href.toString().split('/')[3];

      var trail = window.location.href.toString().split('/')[3];
      // Remove querystring params if in url
      var qMarkPos = trail.indexOf("?");
      var trail = qMarkPos > -1 ? trail.substring(0, qMarkPos) : window.location.href.toString().split('/')[3];
      // determine active section for the first level nav icons
      var activeTrail = '#masthead-mobile-' + trail;
      
      jQuery(activeTrail).addClass('active');
  // 
  // END Basic Menu Structure
  // -------------

  // -------------
  // BEGIN Text Refactoring (moving H1s, H2s, menus, search boxes, etc.)
  // 

      // bugfix: some pages wrap the h1 in a div.content!? GOA, i'm looking at you...
      if (jQuery('#local-title > .content > h1').length > 0) { jQuery('#local-title > .content:first').removeClass('content'); }
      if (jQuery('#local-search > .content').length > 0) { jQuery('#local-search > .content:first').removeClass('content'); }

      // refactor page header and local title ...
      // remove any empty spans in the h1. A span is meant to indicate a subpage
      jQuery('h1').find('span:empty').remove(); 
      // seperate any child page with a >
      jQuery('h1 span').prepend('> '); 
      // What should we use for the mobile page headline?
      if (jQuery('#content > section > h2').not('.element-invisible').length > 0) {
        var titleMobile = jQuery('#content > section > h2').text();
      } else {
        var titleMobile = jQuery('h1').text();
      }

      // If the page doesn't have a subnav menu, delete the menu flyout.
      // But wait: We have to make special consideration for the research group pages
      // as while they are children of "Research", they are presented as top levels...
      if (jQuery('body').find('.shortcuts.submenu').length < 1) {

        // except on research group pages, oy
        var checkForGroupInTitleAtEnd = titleMobile.substr(titleMobile.length - 6); 
        var checkForGroupInTitleAsParent = titleMobile.indexOf("group >");
        if (trail == 'research' && (checkForGroupInTitleAtEnd == 'group ' || checkForGroupInTitleAsParent > 1)) {
          // voodoo time
          jQuery('#local-nav').detach().appendTo('.content:first');
          jQuery('#local-nav').removeAttr('id','local-nav').wrap('<div class="shortcuts submenu"><div></div></div>');
          jQuery('.shortcuts.submenu .grid_24').addClass('menu').removeClass('grid_24');
          jQuery('.shortcuts.submenu').append('<h3>this group</h3>');
          jQuery('#local-nav-mobile .flyout-nav').remove();

        } else {
          // just remove the menu
          newSubnav = '<div id="newSubnav-nav-mobile" class=""></div>';
        }
      }

      // Set local title to page title, and add menu
      jQuery('.content:first').prepend('<div class="third-level"><h2 class="title-mobile">'+titleMobile+'</h2>'+newSubnav+'</div>'); 
      // For local nav, append the page title; ala: "More in xxxx"
      // jQuery('#more-in-this-page.flyout-nav .label').append(jQuery('h1').text().split('>')[0]); 
      jQuery('#more-in-this-page.flyout-nav .label').append(jQuery('.shortcuts.submenu h3').text());
      
      // Set the page title to section (breadcrumb)
      // But only if the page hasn't supplied a specific title...
      var dontChangeTheseH1s = ['goa','']; // todo: pass in the blacklist of these ...
      activeTrail = window.location.href.toString().split('/')[3].toLowerCase();
      function shouldWeChangeTheHeader() {
        for (var i=0;i < dontChangeTheseH1s.length;i++) {
          if (activeTrail === dontChangeTheseH1s[i]) return false;
        }
        return true; //otherwise show
      }
      if (shouldWeChangeTheHeader()) jQuery('h1').html(jQuery('.active-trail:first')); 


      // If there's inpage or local search, then there's no global search 
      if (jQuery('body').hasClass('inpage-search','local-search')) {
        jQuery('#local-nav-mobile').append(newLocalSearchButton);
        jQuery('#masthead-mobile-search').remove(); // ideally we could leave the global search, but main site JS removes the form :(
      }

      // CLEANUP
      // we don't want to show the same thing in both the h1 and h2
      if (jQuery('#local-title h1').text() == jQuery('h2.title-mobile').text()) {
        jQuery('h2.title-mobile').remove();
      }
      // Force a page title to top level if something weird happened ...
      if (jQuery('#local-title h1').text().length <= 1) {
        jQuery('#local-title h1').html('<a href="/'+activeTrail+'">'+jQuery('#masthead-mobile a.active').text()+'</a>');
      }
      // don't repeat the section title breadcumb in the page title 
      if (titleMobile.indexOf(jQuery('h1').text()+' >') >= 0) {
        var trimmedMobileTitle = titleMobile.slice((jQuery('h1').text()+' >').length,1000);
        jQuery('h2.title-mobile').html(trimmedMobileTitle);
      }

      // move any local task icons from second to third level...
        // Note: done slightly later as we're looking for JS injected content :-(
        // Note: we use "detach" to retain any associated JS events
      function moveLinkToThirdLevel(linkToBeMoved,newLocation) {
        newLocation = newLocation || '#newSubnav-nav-mobile'; // default location
        setTimeout( function() { 
          jQuery(linkToBeMoved).detach().appendTo(jQuery(newLocation));
        }, 1500);
      }

      moveLinkToThirdLevel('li#share');
      moveLinkToThirdLevel('.feed-icon');

  // 
  // END Text Refactoring (moving H1s, H2s, menus, search boxes, etc.)
  // -------------


  // -------------
  // BEGIN Button Functionality
  // 
      var targetMenus = [];
      var lastMenuUsed = 0; // track the last menu used..

      // Link our buttons and menus, should pass fully qualified CSS selectors
      function associateMobileMenuAndButton (identifierButton,identifierMenu) {
        setTimeout(function(){ // give a chance for other JS to run before assigning data attribs
          jQuery(identifierButton).data('mobile-menu-id',identifierMenu);
          jQuery(identifierMenu).data('mobile-menu-parent-id',identifierButton);
          jQuery(identifierMenu).addClass('flyout-nav-child-menu');
        }, 1000);
        targetMenus.push(identifierMenu);
      }

      // associate the menus with the GUI elements ...
      associateMobileMenuAndButton('#masthead-mobile-search','form#global-search');
      associateMobileMenuAndButton('#more-in-this-page','.shortcuts.submenu:first');
      associateMobileMenuAndButton('#more-in-this-section','#local-nav');
      associateMobileMenuAndButton('#masthead-mobile-search-local','form#local-search');

      if (trail == 'training') { // Apply only in training
        associateMobileMenuAndButton('#more-training-filters','form#ebi-training-filters-filters-form');
      }
      
      // User has asked to open a menu
      jQuery('.flyout-nav').click(function(e) {

        // which menu do we want to show?
        lastMenuUsed = targetMenus.indexOf(jQuery(this).data('mobile-menu-id'));
        var clickedButtonTarget = jQuery(this).data('mobile-menu-id');
        var clickedButton       = jQuery(clickedButtonTarget).data('mobile-menu-parent-id');

        // close all other menus
        for (var i = 0; i < targetMenus.length; i++) {
          if (i != lastMenuUsed) closeMenus(i);
        }

        // visual feedback
        jQuery(this).find('.arrow').toggleClass('down').toggleClass('up');
        jQuery(this).toggleClass('active');

        // show the menu
        jQuery(clickedButtonTarget).toggle();

        // any special positioning that needs to be done?
        switch(clickedButton) {
          case '#masthead-mobile-search':
            jQuery(clickedButtonTarget).css({"top":jQuery(clickedButton).offset().top});
            setTimeout(function(){ jQuery("#global-searchbox").focus(); }, 500);
            break;
          case '#more-in-this-page':
            jQuery(clickedButtonTarget).css({"top":'0',"left":0,"margin-top":'0'}); //reset
            jQuery(clickedButtonTarget).offset(jQuery(clickedButton).offset());
            jQuery(clickedButtonTarget).css({"margin-top":'1em'});
            // if the menu goes off the right side, bring it in..
            if (jQuery('.shortcuts.submenu').width() + jQuery('.shortcuts.submenu').position().left > jQuery('body').width()) {
              jQuery('.shortcuts.submenu').css({'left':'','margin-top':'1em','right':'1px'});
            }
            break;
          case '#more-in-this-section':
            break;
          case '#masthead-mobile-search-local':
            jQuery(clickedButtonTarget).css({"top":jQuery(clickedButton).offset().top,"left":0});
            setTimeout(function(){ jQuery("#local-searchbox").focus(); }, 500);
            break;
        }
        return false;
      });

      // close menus at every chance ...
      window.onclick = function(e) {
        if (e.srcElement.id == 'global-searchbox') { 
          // we don't want to close the menu if the user is interacting with a form...
        } else {
          closeMenus(lastMenuUsed);
        }
      }

      function closeMenus(target) {
        jQuery(targetMenus[target]).hide();
        jQuery(jQuery(targetMenus[target]).data('mobile-menu-parent-id')+' .arrow').addClass('down').removeClass('up');    
        jQuery(jQuery(targetMenus[target]).data('mobile-menu-parent-id')+'.flyout-nav.active').removeClass('active');
      }
  // 
  // END Button Functionality
  // -------------

  // -------------
  // BEGIN Closure functionality
  // 

  jQuery('body').addClass('responsive-done');
  document.body.style.paddingTop = '0'; //show the content

  // 
  // END Closure functionality
  // -------------

  // Run page specific JS
  // We want this to definetly happen after the global bootstrap...
  setTimeout(function(){ 
    responsifyPageSpecific(qMarkPos,trail);
  }, 300);

  // Update the text of the search button
  jQuery('form#global-search input.submit').val('Search');

  // If we're on the top-level of the section, show the "more in this section" menu
  setTimeout(function(){ 
    if (jQuery('#local-nav > li:first-child').hasClass('active-trail')) {
      jQuery('#more-in-this-section').click(); // we have to wait until they're associated...
      jQuery('#local-nav-mobile .flyout-nav').remove();
      jQuery('#local-nav-mobile').remove();
      jQuery('#local-nav > li.active-trail').remove();
      // Make the menu persistent, by
      // removing the ID from the list of menus to close
      targetMenus.splice(targetMenus.indexOf("#local-nav"),1); 
    }
  }, 1000);

  // Tracking for mobile analytics
  var _paq = _paq || [];
  // Track if user opened a flyout menu before clicking a child link
  // var trackFlyoutOpened = false;
  // HACK: register as being on www.ebi.ac.uk main site
    jQuery.getScript("http://"+"www"+".ebi.ac.uk/web/piwik/piwik.js", function(){ });
    (function(){var u=(("https:" == document.location.protocol) ? "https://"+"www"+".ebi.ac.uk/web/piwik/" : "http://"+"www"+".ebi.ac.uk/web/piwik/");_paq.push(["setSiteId", "3"]);_paq.push(["setTrackerUrl", u+"piwik.php"]);_paq.push(["setDoNotTrack", 1]);_paq.push(["trackPageView"]);_paq.push(["setIgnoreClasses", ["no-tracking","colorbox"]]);_paq.push(["enableLinkTracking"]);var d=document,g=d.createElement("script"),s=d.getElementsByTagName("script")[0];g.type="text/javascript";g.defer=true;g.async=true;g.src=u+"piwik.js";s.parentNode.insertBefore(g,s);})();
  // HACK END
  function trackMobileMenu(actedOnItem) {
    var linkName = actedOnItem.text();
    _paq.push(['trackEvent', 'Menu', 'Mobile Menu /' + trail, linkName]);
  }
  if (_paq.length > 1) { jQuery('body').addClass('piwik-loaded-mobile'); }
  jQuery('body.piwik-loaded-mobile a.flyout-nav').click(function(e) { 
    trackMobileMenu(jQuery(this)); 
    // trackFlyoutOpened = true; 
  });
  jQuery('body.piwik-loaded-mobile .flyout-nav-child-menu a').live('click', function(e) { 
    trackMobileMenu(jQuery(this));     
    // Is this a double sequence event?
    // if (trackFlyoutOpened) {
    //   _paq.push(['trackEvent', 'Menu', 'Mobile Menu /' + trail, linkName]);      
    // }
  });

// }
