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
    var sourceUpcomingEvents   = $("#upcoming-events-template").html();
    var templateUpcomingEvents = Handlebars.compile(sourceUpcomingEvents);
    $.getJSON("/sites/ebi.ac.uk/files/data/events-common-fields-feed-upcoming-events.json", function(data) {
    // $.getJSON("/sites/ebi.ac.uk/files/data/events-common-fields-feed-upcoming-events-3-month.json", function(data) {
      var parsedData = { "nodes" : data };

      // console.log(data);
      
      $("#upcoming-events-content-placeholder").html(templateUpcomingEvents(parsedData));

      // invoke the keyword filter
      $('#upcoming-wraper').liveFilter('#upcoming-events-content-placeholder');

      // Group the months together
      var split_at = '#upcoming-wraper h3';
      $(split_at).each(function() {
        $(this).add($(this).nextUntil(split_at)).wrapAll("<div class='month-group'/>");
      });

    });

    // ----------------
    // Invoke the handlebars template for the featured events list
    // ----------------
    var sourceFeaturedEvents   = $("#featured-events-template").html();
    var templateFeaturedEvents = Handlebars.compile(sourceFeaturedEvents);

    $.getJSON("/sites/ebi.ac.uk/files/data/events-featured-events-feed-featured-events.json", function(data) {
        var now = $.now();  // Get current time
        var featuredData = data.filter(function(elem){    // Remove featured events older than now
          var eventDate = new Date(elem.starts.value);
          return eventDate.getTime() > now; 
        });
    
        var parsedData = { "nodes" : featuredData };
      //var parsedData = { "nodes" : data };
      // console.log(data);
      $("#featured-events-content-placeholder").html(templateFeaturedEvents(parsedData));
    });

    // ----------------
    // Show the last-chance topic bar as user scrolls
    // ----------------
    var scrolledAmount = 0,
        eventsListingPosition = $('#upcoming-wraper').position();

    //pad position by ###px so it starts after the user scrolls past
    eventsListingPosition.top += 250;

    $(window).scroll(function (event) {
      scrolledAmount = $(window).scrollTop();
      if (scrolledAmount > eventsListingPosition.top) {
        $('.topic-bar').addClass('active');
      } else {
        $('.topic-bar').removeClass('active');
      }
    });

    // ----------------
    // Smooth scroll anchor links
    // ----------------
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 100 // -100 pixels as a buffer
          }, 700);
          $(target).parent().parent().delay(1000).fadeTo(500, 0.5).fadeTo(500, 1); //flash it so the user sees it ...
          return false;
        }
      }
    });


  });
}(jq111));  
