/**
 * EBI Global Search result function
 *  Nicola Buso
 *  EMBL-EBI
 */

function renderMenu(elem, items, baseURL, query, skipEmptyResults) {
  var ul = $("<ul>").attr("id", "global-search-results");
  $(elem).find("h3").after(ul);
  var subtitle;

  var totalCount = 0;
  $.each(items, function(index, item) {
    if (!(skipEmptyResults && item.numberOfResults <= 0)) {
      renderItem(ul, item, baseURL);
    }
  totalCount += item.numberOfResults;
  });

  if (totalCount <= 0 && skipEmptyResults) {
    subtitle = $("<p>").text("No results for \""+query+"\"");
  } else {
    subtitle = $("<p>").text("Other results for \""+query+"\"");
  }
  $(elem).find("h3").after(subtitle);
}

function renderItem(ul, item, baseURL) {
  $( "<li>" )
      .append( $( "<a>" ).attr("href", baseURL+item.url)
                 .text( item.name + " ("+item.numberOfResults+")" )
      ).appendTo( ul );
}

/*
 * Function that call EBI-Search service "Global Search Summary"; the service return total result numbers divided per
 * domain categories.
 * 
 * The options parameter is a list of configuration about the behaviour of the function:
 * - searchboxId:       id of the text field used to get the query to execute. Default: local-searchbox
 * - searchBaseURL:     Base URL referencing the EBI Search installation. Default: /ebisearch/
 * - globalSearchBoxId: id of the box where the results will be put. Default: ebi_search_results
 * - loadingLabel:      label displayed while the search request is processed. Default Loading other results
 * - loadingLabelClass: css class applied to 'globalSearchBoxId' while precessing the request: Default: loading
 * - titleLabel:        label used as title for the global search results box. Default: EBI global search results
 * - skipEmptyResults:  if true avoid to print data with 0 results. Default true
 * 
 * The function create a unordered list as the below, using the id 'global-search-results' to identify it
 * 
 * <aside class="grid_6 omega shortcuts expander" id="search-extras">
    <div id="ebi_search_results">
    <h3 class="slideToggle icon icon-functional" data-icon="w">Show more data from EMBL-EBI</h3>
    <p>...message...</p>
    <ul id="global-search-results">
      <li><a href="http://frontier.ebi.ac.uk/ebisearch/search.ebi?db=nucleotideSequences&t=protine&sort=_relevance"></a></li>
      <li><a href="http://frontier.ebi.ac.uk/ebisearch/search.ebi?db=proteinSequences&t=protine&sort=_relevance"></a></li>
      <li><a href="http://frontier.ebi.ac.uk/ebisearch/search.ebi?db=literature&t=protine&sort=publication_date&reverse=true"></a></li>
    </ul>
    </div>
   </aside>
 * 
 * 
 */
 

function updateSummary(options) {
  var opts = {};
  opts.searchboxId = options.searchboxId || "local-searchbox";
  opts.searchBaseURL = options.searchBaseURL || "/ebisearch/";
  opts.globalSearchBoxId = options.globalSearchBoxId || "ebi_search_results";
  opts.loadingLabel = options.loadingLabel || "Loading other results";
  opts.loadingLabelClass = options.loadingLabelClass || "loading";
  opts.titleLabel = options.titleLabel || "Show all data from EMBL-EBI";
  opts.skipEmptyResults = options.skipEmptyResults !== null? options.skipEmptyResults : true;
  opts.noResults = options.noResults !== null? options.noResults : false;
  
  var query = $("#" + opts.searchboxId).val();
  if (query) {
    var searchBaseURL = opts.searchBaseURL;
    var thisElem = $.find("#" + opts.globalSearchBoxId);
        $(thisElem).find("ul").remove();
        $(thisElem).find("p").remove();
        $(thisElem).find("h3").addClass(opts.loadingLabelClass);

    $.ajax({
      searchBaseURL: searchBaseURL, 
      url: searchBaseURL+"globalsearchsummary.ebi?query="+query+"&noResults="+opts.noResults,
      context: thisElem,
      dataType: "json",
      crossdoamin: true,
      error: function(request, error) {
        alert("Error occurred: "+error);
      },
      success: function (data, textStatus, jqHXR) {
      }
    }).done(function( response ) {
      var obj = response;
//      $(this).text("");
      $(this).find("h3").removeClass(opts.loadingLabelClass);
//      $(this).append("<h3 class=\"slideToggle icon icon-functional\" data-icon=\"w\">"+opts.titleLabel+"</h3>");
      renderMenu(this, obj, searchBaseURL, query, opts.skipEmptyResults);
    });
  }
}
