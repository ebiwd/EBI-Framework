/*
  EBI Blobal Search Expander
  
  Code used to expand and collapse EBI "global results" on search results pages.
  Relies on jQuery.
  
  Authors: Glen van Ginkel, Peter Walter, Nicola Buso, Francis Rowland
*/


$(document).ready(function() {
  if ($("body").hasClass("noresults")) {
    try {
      /* The simplest implementation, used on your zero search results pages */
        updateSummary({noResults: true});          
    } 
    catch (except_1) {}
  
  } else {
  
      try {
        /* This case is used on search results pages where your service does return results
           and we want to display a widget that expands/collapses */
          $('#search-extras .slideToggle[data-icon="u"]').next().hide();
          jQuery("#search-extras .slideToggle").click(function() {
              $(this).attr("data-icon", $(this).attr("data-icon") === 'u' ? "w" : "u");
              if ($(this).attr("data-icon") === 'w') {
                  updateSummary({});
              }
              $(this).parent().find("p").slideToggle(300);
              $(this).parent().find("ul").slideToggle(300);
          });
      } 
      catch (except_1) {}
  }
});