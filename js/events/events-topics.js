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

    var pageLocation = window.location.pathname.split('/'); // where the heck are we?
    pageLocation = pageLocation[1] + "/" + pageLocation[2]; // works for urls in the style of http://something.com/section/topic/querry-paramater


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
          // placeholder: getTopicFromUrl(),
          data:{ results: combinedTopics, text: 'name' },
          formatSelection: format,
          formatResult: format
        });
      
        // set default select2 to url 
        var queryTopic = getTopicFromUrl();
        $("#e1").select2("val", queryTopic);

        // redirect when user selects an item
        $('#e1, #e2')
          .on("change", function(e) { 
            window.location.href = "/"+pageLocation+"/"+e.val;
            $("#e1").select2("val", 'loading...'); // to do: add loading notification 
          })

      }
      else {
          // A JSON request has failed ...
      }

    });

    // ----------------
    //invoke the handlebars template for the upcoming events list
    // ----------------
    var sourceUpcomingEvents   = $("#event-topic-template").html();
    var templateUpcomingEvents = Handlebars.compile(sourceUpcomingEvents);
    // http://wwwdev.ebi.ac.uk/sites/ebi.ac.uk/files/data/events-common-fields-feed-past-events.json
    $.getJSON("/sites/ebi.ac.uk/files/data/events-common-fields-feed-all-events.json", function(data) {
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
      
      $("#events-topic-content-placeholder").html(templateUpcomingEvents(parsedData));

      // invoke the keyword filter
      $('#upcoming-wraper').liveFilter('#events-topic-content-placeholder');

      // Group the months together
      var split_at = '#upcoming-wraper h3';
      $(split_at).each(function() {
        $(this).add($(this).nextUntil(split_at)).wrapAll("<div class='month-group'/>");
      });

      // querry for any requested url
      // Send 'topic' querystring as filters
      // var queryString = getQueryString();
      var queryTopic = getTopicFromUrl();
      if(queryTopic) {
        $("#livefilter").val('topic:' + queryTopic).trigger("change");
      }

      // queryTopic = queryTopic.replace(/-/g, ' ');

      // $('#content #breadcrumb p').append(' ' +queryTopic);
      // $('#content h2').append(queryTopic);


    });

    // Read a page's GET URL return the last path.
    function getTopicFromUrl() {
      // var urlPattern = new RegExp('\/about\/events\/topic\/', "g");

      var pageLocation = window.location.pathname.split('/'); // where the heck are we?
      var path = window.location.pathname.split('/');
      if (!pageLocation[3]) { 
        return 'dna-rna'; // if the user doesn't give a third parameter, set one for them
      } else {
        return path[path.length -1];
      }
    }
    
    // // Read a page's GET URL variables and return them as an associative array.
    // function getQueryString() {
    //   var vars = [], hash;
    //   hashes = window.location.search.slice(window.location.search.indexOf('?') + 1).split('&');

    //   for (var i = 0; i < hashes.length; i++) {
    //     hash = hashes[i].split('=');
    //     if (hash[1] != undefined) {
    //       vars.push(hash[0] + '=' + hash[1]);
    //     }
    //   }

    //   //console.log((window.location.search.split('&')));
    //   return vars;
    // }
    
    // // Format query string: replace = with : 
    // function formatQueryString(qs) {
    //   var vars = [];
      
    //   for (var i = 0; i < qs.length; i++) {
    //     hash = hashes[i].split('=');
    //     vars.push(hash[0] + ':' + hash[1]);
    //   }
    //   return vars;
    // }


  });
}(jq111));  