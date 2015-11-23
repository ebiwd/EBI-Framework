// The main thread
// again, note that we've used jquery no conflict with the variable jq111 - :(..
(function ($) {
  $( document ).ready(function() {

    function drupalStyleIDs (data) {
      // Make an ID to match the drupal way ... spaces to hyphens, no ampersands and so forth
      $(data).each( function() {
        this.id = this.name.replace(/ /g, '-').replace(/,/g, '').replace(/\&/g, '').replace(/\./g, '').replace(/--/g, '-').toLowerCase(); //todo: regex...
      });    
      return data;  
    }

    // filter out topics that have no associated nodes
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    function filterByCount(obj) {
      return (obj.count > 0) ? true : false; 
    }

    // pull in the json list of topics and then strap select 2
    var jsonEbiTopics, jsonTopics;
    $.when(
      $.getJSON('/sites/ebi.ac.uk/files/data/events-taxonomy-feed-ebi-topic.json', function(data) {
          jsonEbiTopics = data;
      }),
      $.getJSON('/sites/ebi.ac.uk/files/data/events-taxonomy-feed-topic.json', function(data) {
          jsonTopics = data.filter(filterByCount); // filter out 0 count topics
      })
    ).then(function() {
      if (jsonEbiTopics && jsonTopics) {
        // We haz data

        // programatically create an ID.
        jsonEbiTopics = drupalStyleIDs(jsonEbiTopics);
        jsonTopics = drupalStyleIDs(jsonTopics);

        // how many topics?
        var numberOfEntries = jsonEbiTopics.length + jsonTopics.length;
        $('.topic-count').html(numberOfEntries);

        // a "spacer"
        var spacerRow = [{"name":"---------","clean_path":"","count":0}]; 

        var combinedTopics = jsonEbiTopics.concat(spacerRow).concat(jsonTopics);

        function format(item) { return item.name; }
         
        // invoke select2
        $('#e1, #e2').select2({
          // bookmark for more options: http://select2.github.io/select2/
          placeholder: 'Select a topic',
          data:{ results: combinedTopics, text: 'name' },
          formatSelection: format,
          formatResult: format
        });

        // redirect when user selects an item
        $('#e1, #e2')
          .on("change", function(e) { 
            // alert('logic not yet implemented: where is the right URL home for EBI topics and general topics?')
            window.location.href = "/about/topic/"+e.val;
            // console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed})); 
          })

      }
      else {
          // A JSON request has failed ...
      }

    });

    // ----------------
    //invoke the handlebars template for the upcoming events list
    // ----------------
    var sourceUpcomingEvents   = $("#archived-events-template").html();
    var templateUpcomingEvents = Handlebars.compile(sourceUpcomingEvents);
    // http://wwwdev.ebi.ac.uk/sites/ebi.ac.uk/files/data/events-common-fields-feed-past-events.json
    $.getJSON("/sites/ebi.ac.uk/files/data/events-common-fields-feed-past-events.json", function(data) {
      // -- upcoming events
      // sort the data chronologically
      data.sort(function (a, b) {
        if (new Date(a.starts['value']) < new Date(b.starts['value'])) {
          return 1;
        }
        if (new Date(a.starts['value']) > new Date(b.starts['value'])) {
          return -1;
        }
        return 0;
      });

      var parsedData = { "nodes" : data };
      
      $("#archived-events-content-placeholder").html(templateUpcomingEvents(parsedData));

      // invoke the keyword filter
      $('#upcoming-wraper').liveFilter('#archived-events-content-placeholder');

      // Detect any user requested year or type and search for it
      // a la: /about/events/archive?year=2015

      var qd = {};
      location.search.substr(1).split("&").forEach(function(item) {var s = item.split("="), k = s[0], v = s[1] && decodeURIComponent(s[1]); qd[k] = v})

      var userSuppliedYear = qd['year'];
      if (userSuppliedYear !== undefined) {
        jq111('#filter-buttons select').val(userSuppliedYear).change();
      }
      var userSuppliedType = qd['type'];
      if (userSuppliedType !== undefined) {
        jq111('#filter-buttons input').val(userSuppliedType).change();
      }

    });

  });
}(jq111));  
