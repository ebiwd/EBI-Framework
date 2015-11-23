/* Copyright (c) EMBL-EBI 2013
   Authors: 
   Peter Walter (pwalter@ebi.ac.uk)
   Francis Rowland (frowland@ebi.ac.uk)
*/
/*
(function insertSurvey() {
  // can only use on drupal panel pages, jquery required

  try {
    // use the following conditions to specify the domain & path 
    if (document.location.hostname !== 'wwwdev.ebi.ac.uk' && document.location.hostname !== 'www.ebi.ac.uk') return;
    if (document.location.pathname !== '/' && document.location.pathname !== '/services') return;
    if (typeof(jQuery) !== 'function') return;
    
    // container to insert before
    var container = '.panels-flexible-region-service-sidebar div.shortcuts.transparent:first';

    // html to insert
    var html = '<div class="shortcuts transparent survey"><div class="panel-pane pane-custom clearfix" style="' +
    '  border: 1px solid #e5a066;' +
    '  border-radius: 6px 6px 0 0;' +
    '  -moz-border-radius: 6px 6px 0 0;' +
    '  -khtml-border-radius: 6px 6px 0 0;' +
    '  -webkit-border-radius: 6px 6px 0 0;' +
    '">' +

    '<h3 class="pane-title" style="' +
    '  background-color: #e5a066;' +
    '">Survey</h3>' +

    '<p style="' +
    '  padding-top: 9px;' +
    '">Please help us to improve EMBL-EBI services. For your chance to win an iPad, take our <a href="http://www.ebi.ac.uk/survey9" rel="nofollow">short survey</a>.</p>' +
    


    '  </div>' +
    '</div>';
    
    // do the business
    jQuery(html).insertBefore(container);
  }
  catch (err) {};
}());
*/