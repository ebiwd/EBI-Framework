/**
 * Utility function to toggle classes. Chiefly to show the #embl-bar.
 */
function ebiToggleClass(element, toggleClass){
   var currentClass = element.className;
   var newClass;
   if(currentClass.split(" ").indexOf(toggleClass) > -1){ // has class
      newClass = currentClass.replace(new RegExp('\\b'+toggleClass+'\\b','g'),"")
   } else{
      newClass = currentClass + " " + toggleClass;
   }
   element.className = newClass.trim();
}

/**
 * Utility function to add classes (only once).
 */
function ebiActivateClass(element, cssClass){
  element.classList.remove(cssClass);
  element.classList.add(cssClass);
}

/**
 * Utility function to remove classes.
 */
function ebiRemoveClass(element, cssClass){
  element.classList.remove(cssClass);
}

/**
 * Remove global-nav/global-nav-expanded from header/footer if body.no-global-nav is set
 */
function ebiFrameworkHideGlobalNav() {
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
}

/**
 * Assign global nav background images through meta tags
 */
function ebiFrameworkAssignImageByMetaTags() {
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
}

/**
 * Populate `#masthead-black-bar`
 */
function ebiFrameworkPopulateBlackBar() {
  try {
    // Clear any existing black bar contents
    if ((elem=document.getElementById('masthead-black-bar')) !== null) {
      document.getElementById('masthead-black-bar').innerHTML = "";
    }

    var barContents = document.createElement("div");
    barContents.innerHTML = '<nav class="row">'+
      '<ul id="global-nav" class="menu global-nav text-right">'+
        '<li class="home-mobile"><a href="https://www.ebi.ac.uk"></a></li>'+
        '<li class="where embl hide"><a href="http://www.embl.org">EMBL</a></li>'+
        '<li class="where barcelona hide"><a href="#">Barcelona</a></li>'+
        '<li class="where hamburg hide"><a href="#">Hamburg</a></li>'+
        '<li class="where grenoble hide"><a href="#">Heidelberg</a></li>'+
        '<li class="where grenoble hide"><a href="#">Grenoble</a></li>'+
        '<li class="where rome hide"><a href="#">Rome</a></li>'+
        '<li id="embl-selector" class="float-right show-for-medium embl-selector">'+
          '<button class="button float-right">&nbsp;</button>'+
        '</li>'+
        '<li class="float-right search">'+
          '<a href="#" data-toggle="search-global-dropdown"><span class="show-for-small-only">Search</span></a>'+
          '<div id="search-global-dropdown" class="dropdown-pane" data-dropdown data-options="closeOnClick:true;">'+
          '</div>'+
        '</li>'+
        '<li class="what about"><a href="https://www.ebi.ac.uk/about">About us</a></li>'+
        '<li class="what training"><a href="https://www.ebi.ac.uk/training">Training</a></li>'+
        '<li class="what research"><a href="https://www.ebi.ac.uk/research">Research</a></li>'+
        '<li class="what services"><a href="https://www.ebi.ac.uk/services">Services</a></li>'+
        '<li class="where ebi"><a href="https://www.ebi.ac.uk">EMBL-EBI</a></li>'+
        // '<li class="float-right embl-selector">'+
        //   '<a class="button float-right">&nbsp;</a>'+
        // '</li>'+
        // '<li class="what mission hide"><a href="//www.embl.org">More mission areas:</a></li>'+
      '</ul>'+
    '</nav>';
    document.getElementById("masthead-black-bar").insertBefore(barContents,document.getElementById("masthead-black-bar").firstChild);
  }
  catch(err) {};
}

/**
 * Reusable function to get part of the  black bar
 */
function ebiGetFacet(passedAttribute){
  var tag = "#masthead-black-bar ." + passedAttribute.toLowerCase();
  return document.querySelectorAll(tag)[0];
}

/**
 * Active tabs in `#masthead-black-bar` accoriding to metadata
 */
function ebiFrameworkActivateBlackBar() {
  // Look at the embl:facet-* meta tags to set active states
  // <meta name="embl:rational" content="-3" />
  // <meta name="embl:external" content="8" />
  // <meta name="embl:active" content="what:*" />
  // <meta name="embl:parent-1" content="" />
  // <meta name="embl:parent-2" content="" />
  try {

    var metas = document.getElementsByTagName('meta');
    for (var i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") == "embl:active") {
        var targetFacet = ebiGetFacet(metas[i].getAttribute("content").replace(':','.'));
        ebiRemoveClass(targetFacet,'hide');
        ebiActivateClass(targetFacet,'active');
      }
      if (metas[i].getAttribute("name") == "embl:parent-1") {
        var targetFacet = ebiGetFacet(metas[i].getAttribute("content").replace(':','.'));
        ebiRemoveClass(targetFacet,'hide');
        ebiActivateClass(targetFacet,'active');
      }
      if (metas[i].getAttribute("name") == "embl:parent-2") {
        var targetFacet = ebiGetFacet(metas[i].getAttribute("content").replace(':','.'));
        ebiRemoveClass(targetFacet,'hide');
        ebiActivateClass(targetFacet,'active');
      }
    }

  }
  catch(err) {};

}

/**
 * Insert EMBL dropdown menu into `#masthead-black-bar`
 */
function ebiFrameworkInsertEMBLdropdown() {
  try {
    // remove any current dropdown
    if ((elem=document.getElementById('embl-dropdown')) !== null) {
      document.getElementById('embl-dropdown').remove();
    }

    var dropdownDiv = document.createElement("div");
    dropdownDiv.innerHTML = '<nav id="embl-bar" class="embl-bar">'+
      '<div class="row padding-bottom-medium">'+
        '<div class="columns padding-top-medium">'+
          '<button class="close-button" aria-label="Close alert" type="button"><span aria-hidden="true">×</span></button>'+
        '</div>'+
        '<div class="columns medium-8">'+
          '<div class="large-8 medium-12">'+
            '<p><h3 class="inline">EMBL</h3> was founded in 1974 by its member states to promote the molecular life sciences in Europe and beyond.</p>'+
          '</div>'+
          '<div class="row large-up-3 medium-up-3 small-up-2 no-underline medium-11">'+
            '<div class="column padding-bottom-medium"><a class="" href="#research"><h5 class="inline underline">Research</h5> the molecular basis of life</a></div>'+
            '<div class="column padding-bottom-medium"><a class="" href="#"><h5 class="inline underline">Services</h5> and infrastructure for research</a></div>'+
            '<div class="column padding-bottom-medium"><a class="" href="#"><h5 class="inline underline">Training</h5> and inspiring scientists</a></div>'+
            '<div class="column padding-bottom-medium"><a class="" href="#"><h5 class="inline underline">Transfer</h5> and deverlopment of technology</a></div>'+
            '<div class="column padding-bottom-medium"><a class="" href="#"><h5 class="inline underline">Integrating</h5> life science research in Europe</a></div>'+
          '</div>'+
          '<div class="margin-top-xlarge no-underline">'+
            '<h3><a href="//embl.org" class="readmore">More about EMBL</a></h3>'+
          '</div>'+
        '</div>'+
        '<div class="columns medium-4">'+
          '<div class="large-10 medium-12">'+
            '<p><h3 class="inline">Six locations</h3> represent EMBL across Europe, each has its own focus.</p>'+
          '</div>'+
          '<div class="row large-up-3 medium-up-2 small-up-2">'+
            '<div class="column"><h5><a href="//www.embl-barcelona.es/">Barcelona</a></h5><p class="small">Tissue biology and disease modelling</p></div>'+
            '<div class="column"><h5><a href="//www.embl.fr/">Grenoble</a></h5><p class="small">Structural biology</p></div>'+
            '<div class="column"><h5><a href="//www.embl-hamburg.de/">Hamburg</a></h5><p class="small">Structural biology</p></div>'+
            '<div class="column"><h5><a href="//www.embl.de/">Heidelberg</a></h5><p class="small">Main laboratory</p></div>'+
            '<div class="column">'+
              '<h5><a href="https://www.ebi.ac.uk/">Hinxton</a></h5>'+
              '<span class="tag "><i class="icon icon-generic" data-icon="["></i> you are here</span>'+
              '<p class="small margin-bottom-none">Bioinformatiocs at the EBI</p>'+
            '</div>'+
            '<div class="column"><h5><a href="//www.embl.it/">Rome</a></h5><p class="small">Epigenetics and neurobiology</p></div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</nav>';
    document.getElementById("masthead-black-bar").insertBefore(dropdownDiv,document.getElementById("masthead-black-bar").firstChild);

    var emblBar = document.querySelectorAll(".embl-bar")[0];
    var emblBarButton = document.querySelectorAll(".embl-selector")[0];
    var blackBar = document.querySelectorAll(".masthead-black-bar")[0];

    // utility function to see if element has a class
    // hasClass(element, 'class-deska');
    function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    // add "peeking" animation for embl selector
    emblBarButton.addEventListener("mouseenter", function( event ) {
      if (hasClass(document.querySelectorAll(".embl-bar")[0], 'active') == false) {
        blackBar.className += ' peek';
      }
    }, false);
    emblBarButton.addEventListener("mouseleave", function( event ) {
      if (hasClass(document.querySelectorAll(".embl-bar")[0], 'active') == false) {
        blackBar.classList.remove("peek");
      }
    }, false);

    // toggle the .embl-bar
    var emblSelector = document.querySelectorAll(".embl-selector")[0].addEventListener("click", function( event ) {
      ebiToggleClass(emblBar,'active');
      ebiToggleClass(emblBarButton,'active');
      window.scrollTo(0, 0);
    }, false);

    var emblSelectorClose = document.querySelectorAll(".embl-bar .close-button")[0].addEventListener("click", function( event ) {
      ebiToggleClass(emblBar,'active');
      ebiToggleClass(emblBarButton,'active');
      window.scrollTo(0, 0);
    }, false);

    // we do this bit with jquery to prototype; need to rewire as vanilla JS.
    ebiGetFacet('where.active').addEventListener("mouseenter", function( event ) {
      $('#masthead-black-bar .where.hide').addClass('hover float-left').removeClass('hide');
      // $('#masthead-black-bar .where.hide').removeClass('hide').addClass('hover');
      $('#masthead-black-bar .what').addClass('hide');
    }, false);
    ebiGetFacet('what.active').addEventListener("mouseenter", function( event ) {
      $('#masthead-black-bar .what').removeClass('hide float-left');
      $('#masthead-black-bar .what').addClass('hover float-left');
      $('#masthead-black-bar .where').addClass('hide');
    }, false);

    // reset black bar contenxts when mousing out
    blackBar.addEventListener("mouseleave", function( event ) {
      console.log('purged');
      $('#masthead-black-bar .hover').removeClass('hover float-left');
      $('#masthead-black-bar .what').removeClass('hide');
      $('#masthead-black-bar .where').addClass('hide');
      ebiFrameworkActivateBlackBar();
    });

  }
  catch(err) {};
}

/**
 * Insert EBI Footer into `#global-nav-expanded`
 */
function ebiFrameworkUpdateFoot() {
  var html = '<div class="columns small-12">' +
    '<h4 class="inline-block"><a href="https://www.ebi.ac.uk" class="no-underline" title="EMBL-EBI">EMBL-EBI</a></h4>' +
    '<span class="small inline-block padding-left-large"><a class="readmore" href="http://intranet.ebi.ac.uk"><span class="icon icon-functional" data-icon="L"></span> Intranet for staff</a></span>' +
  '</div>' +
  '<div class="medium-up-5 small-up-2">' +
    '<div class="column">' +
      '<h5 class="services"><a class="services-color" href="https://www.ebi.ac.uk/services">Services</a></h5><ul>' + ' <li class="first"><a href="https://www.ebi.ac.uk/services">By topic</a></li> ' + ' <li><a href="https://www.ebi.ac.uk/services/all">By name (A-Z)</a></li> ' + ' <li class="last"><a href="https://www.ebi.ac.uk/support">Help &amp; Support</a></li> ' + '</ul></div>' +
    '<div class="column">' +
      '<h5 class="research"><a class="research-color" href="https://www.ebi.ac.uk/research">Research</a></h5><ul>' + ' <li><a href="https://www.ebi.ac.uk/research/publications">Publications</a></li> ' + ' <li><a href="https://www.ebi.ac.uk/research/groups">Research groups</a></li> ' + ' <li class="last"><a href="https://www.ebi.ac.uk/research/postdocs">Postdocs</a> &amp; <a href="https://www.ebi.ac.uk/research/eipp">PhDs</a></li> ' +
    '</ul></div>' +
    '<div class="column"> ' +
      '<h5 class="training"><a class="training-color" href="https://www.ebi.ac.uk/training">Training</a></h5><ul>' + ' <li><a href="https://www.ebi.ac.uk/training/handson">Train at EBI</a></li> ' + ' <li><a href="https://www.ebi.ac.uk/training/roadshow">Train outside EBI</a></li> ' + ' <li><a href="https://www.ebi.ac.uk/training/online">Train online</a></li> ' + ' <li class="last"><a href="https://www.ebi.ac.uk/training/contact-us">Contact organisers</a></li> ' +
    '</ul></div> ' +
    '<div class="column"> ' +
      '<h5 class="industry"><a class="industry-color" href="https://www.ebi.ac.uk/industry">Industry</a></h5><ul>' + ' <li><a href="https://www.ebi.ac.uk/industry/private">Members Area</a></li> ' + ' <li><a href="https://www.ebi.ac.uk/industry/workshops">Workshops</a></li> ' + ' <li><a href="https://www.ebi.ac.uk/industry/sme-forum"><abbr title="Small Medium Enterprise">SME</abbr> Forum</a></li> ' + ' <li class="last"><a href="https://www.ebi.ac.uk/industry/contact">Contact Industry programme</a></li> ' + '</ul></div> ' +
    '<div class="column"> ' +
      '<h5 class="about"><a class="ebi-color" href="https://www.ebi.ac.uk/about">About</a></h5><ul> ' + ' <li><a href="https://www.ebi.ac.uk/about/contact">Contact us</a>' + '<li><a href="https://www.ebi.ac.uk/about/events">Events</a></li> ' + ' <li><a href="https://www.ebi.ac.uk/about/jobs" title="Jobs, postdocs, PhDs...">Jobs</a></li> ' + ' <li class="first"><a href="https://www.ebi.ac.uk/about/news">News</a></li> ' + ' <li><a href="https://www.ebi.ac.uk/about/people">People &amp; groups</a></li> ' +
    '</ul></div>' +
    '</div>';

  function init() {
    try {
      var foot = document.getElementById('global-nav-expanded');
      foot.innerHTML = html;
    } catch (err) {
      setTimeout(init, 500);
    }
  }
  init();
}

/**
 * Insert footer meta info into `#ebi-footer-meta`
 */
function ebiFrameworkUpdateFooterMeta() {
  var d = new Date();
  var html = '<div class="columns">' +
                '<p class="address">EMBL-EBI, Wellcome Genome Campus, Hinxton, Cambridgeshire, CB10 1SD, UK. +44 (0)1223 49 44 44</p> <p class="legal">Copyright &copy; EMBL-EBI ' + d.getFullYear() + ' | EMBL-EBI is <a href="http://www.embl.org/">part of the European Molecular Biology Laboratory</a> | <a href="https://www.ebi.ac.uk/about/terms-of-use">Terms of use</a>' +
                // '<a class="readmore float-right" href="http://intranet.ebi.ac.uk">Intranet</a>' +
              '</p></div>';

  function init() {
    try {
      var foot = document.getElementById('ebi-footer-meta');
      foot.innerHTML = html;
    } catch (err) { setTimeout(init, 500); }
  }
  init();
}

/**
 * Load the downtime/announcement messages, if any.
 * For more info, see: https://gitlab.ebi.ac.uk/ebiwd/ebi.emblstatic.net-root-assets/tree/master/src
 */
function ebiFrameworkIncludeAnnouncements() {
  // var downtimeScript =  'https://dev.ebi.emblstatic.net/announcements.js?' + Math.round(new Date().getTime() / 3600000);

  // are there matching annoucnements for the current URL
  function detectAnnouncements(messages) {

    var currentHost = window.location.hostname,
        currentPath = window.location.pathname;

    // don't treat wwwdev as distinct from www
    currentHost = currentHost.replace(/wwwdev/g , "www");

    // try to show any possible variations of the url
    // Note: this is pretty simple stupid, but maybe it's more effective than a sophisticated solution?
    injectAnnouncements(messages[currentHost]);
    injectAnnouncements(messages[currentHost+'/']);
    injectAnnouncements(messages[currentHost+'/*']);
    if (currentPath.length > 1) {
      // don't try to much no path or '/'
      var currentPathArray = currentPath.split('/');

      // construct a list of possible paths to match
      // /style-lab/frag1/frag2 =
      // - /style-lab/frag1/frag2
      // - /style-lab/frag1
      // - /style-lab
      var pathsToMatch = [currentHost+currentPathArray[0]];
      for (var i = 1; i < currentPathArray.length; i++) {
        var tempPath = pathsToMatch[i-1];
        pathsToMatch.push(tempPath+'/'+currentPathArray[i])
      }

      for (var i = 0; i < pathsToMatch.length; i++) {
        // console.log('matching:',pathsToMatch[i]);
        injectAnnouncements(messages[pathsToMatch[i]]);
        injectAnnouncements(messages[pathsToMatch[i]+'*']);
        injectAnnouncements(messages[pathsToMatch[i]+'/*']);
      }
    }
  }

  // once an annocuncement has been matched to the current page, show it (if there is one)
  function injectAnnouncements(message) {
    if (typeof(message) == 'undefined') {
      return false;
    };

    if (typeof(message.processed) != 'undefined') {
      // don't show a message mroe than once
      return true;
    } else {
      // mark message as shown
      message.processed=true;
    }

    var container = (document.getElementById('main-content-area') || document.getElementById('main-content') || document.getElementById('main') || document.getElementById('content') || document.getElementById('contentsarea'));
    if (container == null) {
      // if no suitable container, warn
      console.warn('A message needs to be shown on this site, but an appropriate container could not be found. \n Message follows:','\n' + message.headline,'\n' + message.message,'\n' + 'Priority:',message.priority)
      return false;
    }
    var banner = document.createElement('div');
    var wrapper = document.createElement('div');
    // var inner = document.createElement('div');

    // banner.id = "";
    banner.className = "notifications-js row margin-top-medium";
    wrapper.className = "row callout " + (message.priority || "");
    wrapper.innerHTML = "<h3>" + message.headline + "</h3>" +
    message.message +
    // "<div id='cookie-dismiss'><button class='close-button' style='top: 0.3rem; color:#fff;' aria-label='Close alert' type='button'><span aria-hidden='true'>&times;</span></button></div>" +
    "";

    container.insertBefore(banner, container.firstChild);

    banner.appendChild(wrapper);
  }

  function loadRemote(file) {
    if (window.XMLHttpRequest) {
      xmlhttp=new XMLHttpRequest();
    }
    xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        eval(xmlhttp.responseText);
        detectAnnouncements(m)
      }
    }
    xmlhttp.open("GET", file, false);
    xmlhttp.send();
  }

  loadRemote('https://dev.ebi.emblstatic.net/announcements.js');
}
