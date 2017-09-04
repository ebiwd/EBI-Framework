/**
 * Disable the global search if a page defines a local search.<br/>
 * Can also be disabled by adding class 'no-global-search' to the body element.
 */
function ebiFrameworkManageGlobalSearch() {
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
                    '</fieldset>' +
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
}

/**
 * Add error alerts for 'no input' on search boxes.<br/>
 * Todo: this, perhaps, shoule be moved to a value-add script file
 */
function ebiFrameworkSearchNullError() {
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
}
