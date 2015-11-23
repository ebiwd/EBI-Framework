// The main thread
(function ($) {
  $( document ).ready(function() {

    // filter out past events
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    function afterToday(obj) {
      var tomorrow = new Date();
      var eventDate = obj.field_starts['value'].replace(" ","T"); // drupal date format needs a "T"
                                    // "2015-10-19 08:15:00" >> "2015-10-19T08:15:00"
      tomorrow.setDate(tomorrow.getDate() + 1);
      return (new Date(eventDate) > tomorrow) ? true : false; 
    }

    // filter out events that aren't today
    function onToday(obj) {
      var today = new Date();
      todayText = today.getFullYear() + ' ' + (today.getMonth() + 1) + ' ' + today.getDate() ;

      var eventDate = obj.field_starts['value'].replace(" ","T"); // drupal date format needs a "T"
                                    // "2015-10-19 08:15:00" >> "2015-10-19T08:15:00"
      var receivedDate = new Date(eventDate);
      receivedDate = receivedDate.getFullYear() + ' ' + (receivedDate.getMonth() + 1) + ' ' + receivedDate.getDate();


      return (receivedDate === todayText) ? true : false; 
    }

    // filter out future events
    function beforeToday(obj) {
      var eventDate = obj.field_starts['value'].replace(" ","T"); // drupal date format needs a "T"
                                    // "2015-10-19 08:15:00" >> "2015-10-19T08:15:00"
      return (new Date(eventDate) < new Date()) ? true : false; 
    }

    // ----------------
    //invoke the handlebars template for the upcoming events list
    // ----------------
    var sourceUpcomingEvents   = $("#upcoming-events-template").html();
    var templateUpcomingEvents = Handlebars.compile(sourceUpcomingEvents);
    $.getJSON("/sites/ebi.ac.uk/files/data/events-feed-seminar.json", function(data) {
    // $.getJSON("/sites/ebi.ac.uk/files/data/events-common-fields-feed-upcoming-events-3-month.json", function(data) {
      
      // -- today's events
      var todaysSeminars = data.filter(onToday);
      todaysSeminars = { "nodes" : todaysSeminars };
      $("#todays-seminars-content-placeholder").html(templateUpcomingEvents(todaysSeminars));

      // -- upcoming events
      // sort the data chronologically
      data.sort(function (a, b) {
        // drupal date format needs a "T", "2015-10-19 08:15:00" >> "2015-10-19T08:15:00"
        a.field_starts['value'] = a.field_starts['value'].replace(" ","T");
        b.field_starts['value'] = b.field_starts['value'].replace(" ","T");

        if (new Date(a.field_starts['value']) > new Date(b.field_starts['value'])) {
          return 1;
        }
        if (new Date(a.field_starts['value']) < new Date(b.field_starts['value'])) {
          return -1;
        }
        return 0;
      });

      var upcomingSeminars = data.filter(afterToday);
      upcomingSeminars = { "nodes" : upcomingSeminars.slice(0,10) }; // only XX seminars wanted

      $("#upcoming-events-content-placeholder").html(templateUpcomingEvents(upcomingSeminars));


      // -- past events
      var pastSeminars = data.filter(beforeToday);

      // sort the data chronologically
      

      pastSeminars.sort(function (a, b) {
        // drupal date format needs a "T", "2015-10-19 08:15:00" >> "2015-10-19T08:15:00"
        a.field_starts['value'] = a.field_starts['value'].replace(" ","T");
        b.field_starts['value'] = b.field_starts['value'].replace(" ","T");
        
        // console.log(a.field_starts);
        if (new Date(a.field_starts['value']) < new Date(b.field_starts['value'])) {
          return 1;
        }
        if (new Date(a.field_starts['value']) > new Date(b.field_starts['value'])) {
          return -1;
        }
        return 0;
      });
      pastSeminars = { "nodes" : pastSeminars.slice(0,5) }; // only XX seminars wanted

      $("#past-events-content-placeholder").html(templateUpcomingEvents(pastSeminars));

      // invoke the keyword filter
      // $('#upcoming-wraper').liveFilter('#upcoming-events-content-placeholder');

    });


    // ----------------
    // Invoke the handlebars template for the featured events list
    // ----------------
    var sourceFeaturedEvents   = $("#featured-seminars-template").html();
    var templateFeaturedEvents = Handlebars.compile(sourceFeaturedEvents);

    $.getJSON("/sites/ebi.ac.uk/files/data/events-featured-events-feed-featured-seminars.json", function(data) {
      var now = $.now();  // Get current time
      var featuredData = data.filter(function(elem){    // Remove featured events older than now
        var eventDate = new Date(elem.starts.value);
        return eventDate.getTime() > now; 
      });
      
      var parsedData = { "nodes" : featuredData };
      // var parsedData = { "nodes" : data };

      $("#featured-seminars-content-placeholder").html(templateFeaturedEvents(parsedData));
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
}(jQuery));  
