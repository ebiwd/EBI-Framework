function ebiFrameworkHideGlobalNav() {
  // Remove global-nav/global-nav-expanded from header/footer
  // if body.no-global-nav is set
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

function ebiFrameworkAssignImageByMetaTags() {
  // Assign global nav background images through meta tags
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

function ebiFrameworkInsertEMBLdropdown() {
  // Insert EMBL dropdown menu
  try {
    // remove any current dropdown
    if ((elem=document.getElementById('embl-dropdown')) !== null) {
      document.getElementById('embl-dropdown').remove();
    }

    var dropdownDiv = document.createElement("div");
    dropdownDiv.innerHTML = '<div id="embl-dropdown" class="embl-dropdown dropdown-pane bottom" data-dropdown>' +
              '<p>EMBL-EBI in Hinxton, Cambridge is one of <br/>six EMBL locations across europe.<br/> <a href="//www.ebi.ac.uk/about" class="small readmore">More about EMBL-EBI</a></p>' +
              '<h6>Connect to another EMBL location</h6>' +
              '<div class="small-collapse padding-bottom-large clearfix">' +
                '<div class="columns small-5 padding-bottom-medium">' +
                  '<a href="http://www.embl.de/">Heidelberg</a>' +
                  '<div class="small">Main laboratory</div>' +
                '</div>' +
                '<div class="columns small-7 padding-bottom-medium">' +
                  '<a href="http://www.embl-barcelona.es/">Barcelona</a>' +
                  '<div class="small">Tissue biology and disease modelling</div>' +
                '</div>' +
                '<div class="columns small-5 padding-bottom-medium">' +
                  '<a href="http://www.embl.fr/">Grenoble</a>' +
                  '<div class="small">Structural biology</div>' +
                '</div>' +
                '<div class="columns small-7 padding-bottom-medium">' +
                  '<a href="http://www.embl-hamburg.de/">Hamburg</a>' +
                  '<div class="small">Structural biology</div>' +
                '</div>' +
                '<div class="columns small-5 padding-bottom-medium">' +
                  '<a href="http://www.embl.it/">Rome</a>' +
                  '<div class="small">Epigenetics and neurobiology</div>' +
                '</div>' +
                '<div class="columns small-7 padding-bottom-medium">' +
                  '<a href="http://embl.org/" class="readmore">More about EMBL</a>' +
                '</div>' +
              '</div>' +
            '</div>';
    document.getElementById("masthead-black-bar").appendChild(dropdownDiv);
    // We don't invoke the dropdown here, as that method depends on how you're using the Framework
  }
  catch(err) {};
}

function ebiFrameworkUpdateFoot() {
  var html = '<div class="columns small-6 medium-2 ">' +
    '<a href="//www.ebi.ac.uk" title="EMBL-EBI"><span class="ebi-logo"></span></a>'  +
  '</div>' +
  '<div class="columns small-6 medium-2">' +
    '<h5 class="services"><a class="services-color" href="//www.ebi.ac.uk/services">Services</a></h5><ul>' + ' <li class="first"><a href="//www.ebi.ac.uk/services">By topic</a></li> ' + ' <li><a href="//www.ebi.ac.uk/services/all">By name (A-Z)</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/support">Help &amp; Support</a></li> ' + '</ul></div>' +
  '<div class="columns small-6 medium-2">' +
    '<h5 class="research"><a class="research-color" href="//www.ebi.ac.uk/research">Research</a></h5><ul>' + ' <li><a href="//www.ebi.ac.uk/research/publications">Publications</a></li> ' + ' <li><a href="//www.ebi.ac.uk/research/groups">Research groups</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/research/postdocs">Postdocs</a> &amp; <a href="//www.ebi.ac.uk/research/eipp">PhDs</a></li> ' +
  '</ul></div>' +
  '<div class="columns small-6 medium-2"> ' +
    '<h5 class="training"><a class="training-color" href="//www.ebi.ac.uk/training">Training</a></h5><ul>' + ' <li><a href="//www.ebi.ac.uk/training/handson">Train at EBI</a></li> ' + ' <li><a href="//www.ebi.ac.uk/training/roadshow">Train outside EBI</a></li> ' + ' <li><a href="//www.ebi.ac.uk/training/online">Train online</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/training/contact-us">Contact organisers</a></li> ' +
  '</ul></div> ' +
  '<div class="columns small-6 medium-2"> ' +
    '<h5 class="industry"><a class="industry-color" href="//www.ebi.ac.uk/industry">Industry</a></h5><ul>' + ' <li><a href="//www.ebi.ac.uk/industry/private">Members Area</a></li> ' + ' <li><a href="//www.ebi.ac.uk/industry/workshops">Workshops</a></li> ' + ' <li><a href="//www.ebi.ac.uk/industry/sme-forum"><abbr title="Small Medium Enterprise">SME</abbr> Forum</a></li> ' + ' <li class="last"><a href="//www.ebi.ac.uk/industry/contact">Contact Industry programme</a></li> ' + '</ul></div> ' +
  '<div class="columns small-6 medium-2"> ' +
    '<h5 class="about"><a class="ebi-color" href="//www.ebi.ac.uk/about">About EMBL-EBI</a></h5><ul> ' + ' <li><a href="//www.ebi.ac.uk/about/contact">Contact us</a>' + '<li><a href="//www.ebi.ac.uk/about/events">Events</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/jobs" title="Jobs, postdocs, PhDs...">Jobs</a></li> ' + ' <li class="first"><a href="//www.ebi.ac.uk/about/news">News</a></li> ' + ' <li><a href="//www.ebi.ac.uk/about/people">People &amp; groups</a></li> ' +
  '</ul></div>';

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

function ebiFrameworkUpdateFooterMeta() {
  var d = new Date();
  var html = '<div class="columns">' +
                '<p class="address">EMBL-EBI, Wellcome Genome Campus, Hinxton, Cambridgeshire, CB10 1SD, UK. +44 (0)1223 49 44 44</p> <p class="legal">Copyright &copy; EMBL-EBI ' + d.getFullYear() + ' | EMBL-EBI is <a href="http://www.embl.org/">part of the European Molecular Biology Laboratory</a> | <a href="//www.ebi.ac.uk/about/terms-of-use">Terms of use</a>' +
                '<a class="readmore float-right" href="http://intranet.ebi.ac.uk">Intranet</a>' +
              '</p></div>';

  function init() {
    try {
      var foot = document.getElementById('ebi-footer-meta');
      foot.innerHTML = html;
    } catch (err) { setTimeout(init, 500); }
  }
  init();
}

function ebiFrameworkIncludeScripts() {
  var downtimeScript =  '//www.ebi.ac.uk/web_guidelines/js/downtime.js?' + Math.round(new Date().getTime() / 3600000);
  putComment = document.createComment(downtimeScript + ' automatically inserted');
  putScript = document.createElement('script');
  putScript.type = 'text/javascript';
  putScript.src = downtimeScript;
  document.body.appendChild(putComment);
  document.body.appendChild(putScript);
}
