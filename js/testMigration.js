/*
  To run, copy-paste the below line into your browser's console:

  jQuery('head').append('<script defer="defer" src="//ebiwd.github.io/EBI-Framework/js/testMigration.js"></script>\n');

 */

console.log('%c ' + String.fromCharCode(0xD83D,0xDC4B) + ' \n Hi. \n I\'ll autopilot a transition of this page to the new EMBL-EBI visual framework.', 'background: rgb(0,124,130); color: #FFF; font-size: 20px;');
console.log('%c This is meant as a rough guide and I\'ll talk through what I\'m doing. Use it as tool, but read the documentation too! ', 'background: #FFF; color: #999; font-style: italic;');
console.log('%c It\'s pretty straightforward, I don\'t think it will have many problems. I hope! ', 'background: #FFF; color: #999; font-style: italic;');
console.log('%c When you\'re ready, type: testMigration()', 'background: rgb(0,124,130); color: #FFF; font-size: 20px;');

function testMigration(steppingTimeSpeed) {

  // A stepping tool to pace out the execution
  steppingTimeSpeed = steppingTimeSpeed || 3000; //ms between each step
  steppingTimeInvoked = 0; // increments number of times invoked
  console.log('There will be '+steppingTimeSpeed+'ms between each step. If you\'d like to run faster or slower, pass a speed to this script a la: testMigration(5000)');
  function steppingTime() {
    steppingTimeInvoked++;
    return steppingTimeSpeed * steppingTimeInvoked;
  }

  // setTimeout(function(){
  //   console.log('Firstoff I\'m going to zoom out a bit so we can see more of the changes.');
  //   document.body.style.zoom = "30%" 
  // }, steppingTime()); 

  setTimeout(function(){
    console.log('%c We\'re off!', 'background: green; color: #FFF; font-style: italic;');
  }, steppingTime()); 

  setTimeout(function(){
    jQuery('head').append('<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>\n');
    console.log('jQuery: Updating to jQuery 1.10. This is version (or newer) is only necessary if you plan to use Foundation\'s JS components.');
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    // Reset and remove old EBI compliance
    jQuery('link[href="//www.ebi.ac.uk/web_guidelines/css/compliance/develop/ebi-global.css"]').remove();
    jQuery('link[href="//www.ebi.ac.uk/web_guidelines/css/compliance/develop/ebi-visual.css"]').remove();
    jQuery('link[href="//www.ebi.ac.uk/web_guidelines/css/compliance/develop/984-24-col-fluid.css"]').remove();


    jQuery('link[href="//www.ebi.ac.uk/web_guidelines/css/compliance/mini/ebi-fluid-embl.css"]').remove();
    jQuery('link[href="//www.ebi.ac.uk/web_guidelines/css/compliance/develop/boilerplate-style.css"]').remove();
    jQuery('link[href="//www.ebi.ac.uk/web_guidelines/css/compliance/mini/ebi-fluid-embl-noboilerplate.css"]').remove();
    console.log('CSS: Removed old EBI boilerplate-style sheets.');
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    jQuery('#ebi-footer-meta').html('');
    jQuery('#global-nav-expanded').html('');
    console.log('Footer: Removed old injected footer.');
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    jQuery('head').append('<link rel="stylesheet" href="//ebiwd.github.io/EBI-Framework/libraries/foundation-6/css/foundation.css" type="text/css" />\n');
    jQuery('head').append('<link rel="stylesheet" href="//ebiwd.github.io/EBI-Framework/css/ebi-global.css" type="text/css" />\n');
    jQuery('head').append('<link rel="stylesheet" href="//ebiwd.github.io/EBI-Framework/fonts/fonts.css" type="text/css" />\n');
    console.log('CSS: Injected new ebi-global.css fonts.css and foundation.css');
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    // Service colour updating

    // Define array of object pairs
    // [what we check for] [what we replace with]
    var colourPalettes = [
                          { "original" : "link[href=\"//www.ebi.ac.uk/web_guidelines/css/compliance/develop/embl-petrol-colours.css\"]", "new" : "//ebiwd.github.io/EBI-Framework/css/embl-petrol-colours.css" },
                          { "original" : ".no-match", "new" : "//ebiwd.github.io/EBI-Framework/css/embl-petrol-colours.css" }
                        ];
    var i = 0;
    // which colour palette is used?
    for (; i < colourPalettes.length; i++) {
      if ((jQuery(colourPalettes[i].original).length) == 1) { break; }
    }
    // did we find a palette?
    if (i < colourPalettes.length) {
      jQuery(colourPalettes[i].original).remove();
      jQuery('head').append('<link rel="stylesheet" href="' + colourPalettes[i].new + '" type="text/css" />\n');
      console.log('Service colours: Found ' + colourPalettes[i].original + ', and replaced with ' + colourPalettes[i].new);
    } else {
      // if no match, we use default EBI
      jQuery('head').append('<link rel="stylesheet" href="' + colourPalettes[colourPalettes.length-1].new + '" type="text/css" />\n');
      console.log('Service colours: Not sure what service colours are meant to be used, adding default EBI Petrol palette: ' + colourPalettes[colourPalettes.length-1].new);
    }
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    jQuery('div#content').addClass('row');
    console.log('Added .row to div#content');
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    // Add new JS
    jQuery('head').append('<script defer="defer" src="//ebiwd.github.io/EBI-Framework/js/cookiebanner.js"></script>\n');
    jQuery('head').append('<script defer="defer" src="//ebiwd.github.io/EBI-Framework/js/foot.js"></script>\n');
    jQuery('head').append('<script defer="defer" src="//ebiwd.github.io/EBI-Framework/js/fontpresentation.js"></script>\n');
    jQuery('head').append('<script defer="defer" src="//ebiwd.github.io/EBI-Framework/js/script.js"></script>\n');

    console.log('Javascript: I\'ve added three scripts:\n' +
                '            //ebiwd.github.io/EBI-Framework/js/cookiebanner.js\n' +
                '            //ebiwd.github.io/EBI-Framework/js/foot.js\n' +
                '            //ebiwd.github.io/EBI-Framework/js/script.js\n'
    );
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    jQuery('#ebi-footer-meta').addClass('row');
    jQuery('#global-nav-expanded').addClass('row');
    jQuery('#local-footer').wrapInner('<div class="row"></div>');
    console.log('Footer: Adding .row class to footer, #ebi-footer-meta and #global-nav-expanded');
    console.log('------------------\n');
  }, steppingTime()); 


  setTimeout(function(){
    // CSS translations
    // grid-XX to medium-XX
    jQuery('div,section').attr('class', function(i, str) { 
      // omega is 24 columns, foundation is 12 columns
      if (typeof str != 'undefined') { 
        function convert(str, p1, p2, offset, s) { return 'columns medium-' + p2/2 + ' temporary-maker-that-this-is-a-column'; }
        var re = /(grid_)([0-9]+)/;
        return str.replace(re, convert);
      }
    });
    console.log('CSS: I\'ve substitued the Omeaga grid_XX classes for Foundation\'s "column medium-XX" classes.\n' +
                '     Note that I\'ve also stepped the 24 column grid to 12 column grid.'
    );
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    // Wrap groups of columns with div.row 
    jQuery('div#content .temporary-maker-that-this-is-a-column').has('.temporary-maker-that-this-is-a-column').wrapInner('<div class="row"/>');
    // jQuery('div#content .medium-12').wrap('<div class="row"/>');
    jQuery('div.temporary-maker-that-this-is-a-column').removeClass('temporary-maker-that-this-is-a-column');
    console.log('CSS: Groups of .columns should be wrapped in div.row s.\n');
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    jQuery('div,input').attr('class',
      function(i, c) { 
        if (jQuery(this).hasClass('medium-24') === true) { 
           // return c.replace(/(^|\s)medium-24/g, ' medium-12');
        }
        if (jQuery(this).hasClass('submit') === true) { 
           jQuery(this).addClass('button');
        }
      });



    jQuery('div').attr('class',
      function(i, c) { 
        if (typeof c != 'undefined') { 
          return c.replace(/(^|\s)omega/g, ' last');
        }
      });

    jQuery('div').removeClass('alpha');

    jQuery('.visuallyhidden').addClass('hide').removeClass('visuallyhidden');
    jQuery('.hidden').addClass('hide').removeClass('hidden');

    jQuery('.submenu ul.menu').addClass('vertical');
  }, steppingTime()); 


  setTimeout(function(){
    // if the search box is missing #local-search
    if (jQuery('div#content fieldset').length > 0) {
      jQuery('div#content fieldset').addClass('callout');
      console.log('Fieldsets: It looks like you have some fieldsets in div#content, I\'m assuming you want these highlighted and have added .callout classes.');
      console.log('------------------\n');
    }
  }, steppingTime()); 

  setTimeout(function(){
    // Update global-mastehad
    var newGloablMasthead = '<div id="global-masthead" class="clearfix">\
      <!--This has to be one line and no newline characters-->\
      <a href="//www.ebi.ac.uk/" title="Go to the EMBL-EBI homepage"><span class="ebi-logo"></span></a>\
      <nav>\
        <div class="row">\
          <ul id="global-nav" class="menu">\
            <!-- set active class as appropriate -->\
            <li id="home-mobile" class=""><a href="//www.ebi.ac.uk"></a></li>\
            <li id="home" class="active"><a href="//www.ebi.ac.uk"><i class="icon icon-generic" data-icon="H"></i> EMBL-EBI</a></li>\
            <li id="services"><a href="//www.ebi.ac.uk/services"><i class="icon icon-generic" data-icon="("></i> Services</a></li>\
            <li id="research"><a href="//www.ebi.ac.uk/research"><i class="icon icon-generic" data-icon=")"></i> Research</a></li>\
            <li id="training"><a href="//www.ebi.ac.uk/training"><i class="icon icon-generic" data-icon="t"></i> Training</a></li>\
            <li id="about"><a href="//www.ebi.ac.uk/about"><i class="icon icon-generic" data-icon="i"></i> About us</a></li>\
            <li id="search">\
              <a href="#" data-toggle="search-global-dropdown"><i class="icon icon-functional" data-icon="1"></i> <span class="show-for-small-only">Search</span></a>\
              <div id="search-global-dropdown" class="dropdown-pane" data-dropdown data-options="closeOnClick:true;">\
                <form id="global-search" name="global-search" action="/ebisearch/search.ebi" method="GET">\
                  <fieldset>\
                    <div class="input-group">\
                      <input type="text" name="query" id="global-searchbox" class="input-group-field" placeholder="Search all of EMBL-EBI">\
                      <div class="input-group-button">\
                        <input type="submit" name="submit" value="Search" class="button">\
                        <input type="hidden" name="db" value="allebi" checked="checked">\
                        <input type="hidden" name="requestFrom" value="global-masthead" checked="checked">\
                      </div>\
                    </div>\
                  </fieldset>\
                </form>\
              </div>\
            </li>\
            <li class="float-right show-for-medium embl-selector">\
              <button class="button" type="button" data-toggle="embl-dropdown">Hinxton</button>\
              <div id="embl-dropdown" class="dropdown-pane" data-dropdown data-options="closeOnClick:true;">\
                to come.\
              </div>\
            </li>\
          </ul>\
        </div>\
      </nav>\
    </div>';

    jQuery('#global-masthead').remove();
    jQuery('#local-masthead').prepend(newGloablMasthead);
    console.log('Removing old global nav and inserting new. It now goes inside the #local-masthead wrapper.');
    console.log('Note: I\'ve made the EMBL-EBI tab .active, you can set whichever you\'d like to be active.');
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    jQuery('#local-masthead').removeClass().addClass('meta-background-image');
    jQuery('#local-masthead').attr({'data-sticky': true, 'data-sticky-on': 'large', 'data-top-anchor': 180, 'data-btm-anchor': 300000});
    jQuery('#local-masthead').wrap('<div data-sticky-container />');
    console.log('Updating local-navigation to be sticky (Foundation JS needed for this)');
    console.log('------------------\n');
  }, steppingTime()); 

  // setTimeout(function(){
  //   // if the search box is missing #local-search
  //   if (jQuery('#local-search').length == 0) {
  //     if (jQuery('#local-masthead .medium-6.last').length == 1) {
  //       jQuery('#local-masthead .medium-6.last').attr('id', 'local-search');
  //       console.log('%c Local search: It looks like it\'s missing #local-search. I\'ll add it.', 'background: green; color: yellow; background: 000;');
  //       console.log('------------------\n');
  //     }
  //   }
  // }, steppingTime()); 
     
  setTimeout(function(){
    jQuery('#local-masthead #local-title.columns, #local-masthead #local-search.medium-6, #local-masthead .medium-6.last').wrapAll('<div class="masthead row"/>');
    console.log('Local title and search: wrapping in a new div with classes .masthead.row');
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    jQuery('ul#local-nav').addClass('dropdown menu float-left');
    jQuery('ul#local-nav').attr({'data-dropdown-menu':true});
    console.log('Local-nav: adding classes .dropdown.menu.float-left have also added attribute data-dropdown-menu for mobile');
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    var localNavTabs = jQuery('#local-masthead > nav').detach();
    jQuery('div.masthead.row').append(localNavTabs);
    console.log('Local-nav: I\'ve moved the local nav tabs inside the new .masthead.row div');
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    // The Foundation theme JavaScript
    jQuery('head').append('<script src="https://ebiwd.github.io/EBI-Framework/libraries/foundation-6/js/foundation.js"></script>\n');
    jQuery('head').append('<script src="https://ebiwd.github.io/EBI-Framework/js/foundationExtendEBI.js"></script>\n');

    console.log('Javascript: I\'ve add the Foundation JS');
    console.log('------------------\n');
  }, steppingTime()); 

  setTimeout(function(){
    console.log('%c All done!', 'background: green; color: #FFF; font-style: italic;');
    // console.log('Zooming back to 100%.');
    // document.body.style.zoom = "100%" 
    console.log('%c Want JS features? By default we\'ve not invoked the JS features, if you\'d like to do so type runJS() ', 'background: #FFF; color: #999; font-style: italic;');
    console.log('%c Want a diff? Type diffUsingJS() ', 'background: #FFF; color: #999; font-style: italic;');
  }, steppingTime()); 

  // setTimeout(function(){
  // }, steppingTime()); 

} // END testMigration

function runJS() {
  $(document).foundation();
  $(document).foundationExtendEBI();
  console.log('Javascript: Foundation JS invoked');
}


// Option to add a diff
var pageOriginalHTML = jQuery('html').html();
jQuery('head').append('<script data-note="just-for-the-diff" src="//cemerick.github.io/jsdifflib/diffview.js"></script>\n');
jQuery('head').append('<script data-note="just-for-the-diff" src="//cemerick.github.io/jsdifflib/difflib.js"></script>\n');

function diffUsingJS() {
  jQuery('head').append('<link rel="stylesheet" href="//cemerick.github.io/jsdifflib/diffview.css" type="text/css" />\n');
  jQuery('head').append('<style type="text/css" data-note="just-for-the-diff">tbody td {padding: 0 !important;word-wrap: break-word;font-size: .8rem;}</style>\n');
  // max-width: 35rem;

  // get the baseText and newText values from the two textboxes, and split them into lines
  var base = difflib.stringAsLines(pageOriginalHTML);
  var newtxt = difflib.stringAsLines($('html').html());

  // create a SequenceMatcher instance that diffs the two sets of lines
  var sm = new difflib.SequenceMatcher(base, newtxt);

  // get the opcodes from the SequenceMatcher instance
  // opcodes is a list of 3-tuples describing what changes should be made to the base text
  // in order to yield the new text
  var opcodes = sm.get_opcodes();
  // $('body').prepend('<div id="diffoutput">Diff</div>');
  //       var element = document.createElement("Input");

  var diffoutputdiv = document.createElement("diffoutput");
  while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
  var contextSize = null;
  contextSize = contextSize ? contextSize : null;

  // build the diff view and add it to the current DOM
  diffoutputdiv.appendChild(diffview.buildView({
      baseTextLines: base,
      newTextLines: newtxt,
      opcodes: opcodes,
      // set the display titles for each resource
      baseTextName: "Original",
      newTextName: "Modified",
      contextSize: contextSize,
      viewType: 1 // 1 for inline, 0 for side-by-side
  }));

  $('div#content').prepend(diffoutputdiv);

  // scroll down to the diff view window.
  // location = url + "#diff";
}


// testMigration(100);

