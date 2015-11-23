// A text filter that also utilizes a tokenized string
// Note: currently requires Select2, but that could be removed
// Form elements should have a parent of #filter-buttons

(function ($) {
  // This runs the keyword filter.
  // High level: 
  // - Splits the user's input into keyworks
  // - event:syntax filters by event
  $.fn.liveFilter = function (wrapper) {

    // strap the filter field as a select2 element
    $("#livefilter").select2({
      placeholder: "Filter by a keyword or two",
      // allowClear: true,
      tags:[""],
      dropdownCssClass: "lifefilter-drop",
      tokenSeparators: [",", " "]})        
    .on("change", function(e) {
      updateIncoming();
      _paq.push(['trackEvent', 'Events', 'Livefilter used']);
    })

    // var wrap = '#' + $(this).attr('id');
    var item = '.upcoming-event';
    $('#upcoming-wraper #s2id_livefilter').keyup(function () {
      updateIncoming();
    });

    // Tokenise filter options
    $('#filter-buttons input, #filter-buttons select').on('change', '', function(e){
      var targetVal          = $(this).val(),
          liveFilterType     = this.name,
          liveFilterVal      = $("#livefilter").val(),
          liveFilterNewValue = '';

      // Before we add a new token, remove all existing tokens for this type
      // console.log('clearning for:',liveFilterType);
      var regexQuery = new RegExp(',{0,1}('+liveFilterType+')+:(\\w)+(\\s{0,1})+(\\w)+', "g");
      var targetValPurged = liveFilterVal.replace(regexQuery, '');
      targetValPurged = targetValPurged.replace(/^,/g, ''); // Remove comma if in first position

      // this is our search string with the old token removed
      liveFilterNewValue = targetValPurged;

      if (targetVal != 'reset') {         
        // Create the token, a la: "year:2011"
        targetVal = liveFilterType+':'+targetVal;
        // Append the new token
        liveFilterNewValue = targetVal + ',' + liveFilterNewValue;
      }

      // Replace any double commas, or trailing commas
      liveFilterNewValue = liveFilterNewValue.replace(/,+$/, "").replace(/,(?=,)/g, ',g');
      // Update the text box
      $("#livefilter").val(liveFilterNewValue).trigger("change");
    });

    function updateIncoming() {
      var inputString = $('#upcoming-wraper #s2id_livefilter').text().toLowerCase() + " " + $('.select2-results-dept-0.select2-result.select2-result-selectable.select2-highlighted').text().toLowerCase();
      var filter = $(inputString);
      var filterArray = filter.selector.split(" "); // an array of what we're to search for

      $(wrapper + ' ' + item).each( function() { // search each entry
        var targetDiv = $(this);

        $(filterArray).each( function() { // search for each term
          var individualSearchTerm = this;

          var stingTermPosition = individualSearchTerm.indexOf(':');

          if (stingTermPosition >= 0) { // year filter 
            var searchSubject = individualSearchTerm.toLowerCase().substring(0,stingTermPosition); // get the matched search token, i.e. "topic"
            individualSearchTerm = individualSearchTerm.toLowerCase().substring(stingTermPosition+1,100); // drop the "topic:"

            // assign a css selector to search for based off the searchSubject
            switch (searchSubject) {
              case 'year':
                searchSubject = '.event-date';
                break;
              case 'topic':
                searchSubject = '.ebi-topic';
                break;
              case 'type':
                searchSubject = '.event-'+searchSubject;
                break;
              default:
                searchSubject = '.'+searchSubject;
                break;
            }

            if ($(targetDiv).find(searchSubject).text().toLowerCase().indexOf(individualSearchTerm) >= 0)  { 
              $(targetDiv).removeClass('hidden');
            } else {
              $(targetDiv).addClass('hidden');
              return false; // aka break
            }
          } 
          else {
            // normal text search
            if ($(targetDiv).text().toLowerCase().indexOf(individualSearchTerm) >= 0) { 
              $(targetDiv).removeClass('hidden');
            } else { 
              $(targetDiv).addClass('hidden');
              return false; // aka break
            }
          }

        });

      });

      // conditionally hide the month header
      $('.month-group').each( function() { 
        var countVisible = $(this).children('.upcoming-event').length - $(this).children('.upcoming-event.hidden').length; 
        if (countVisible == 0) {
          $(this).addClass('hidden');
        } else {
          $(this).removeClass('hidden');
        }
      });

    }
  }

}(jq111));  
