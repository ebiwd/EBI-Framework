// The main thread
(function ($) {
  $( document ).ready(function() {
    // add the speaker name to the topic column
//    $('.event-speakers .views-field-text').prepend($('.event-speakers .views-field-text-1').html());

    // dynamically show event desciption
    $('.event-description-long').slideUp(500);
    $('.event-description p:last').append('<a class="readmore" href="#">Show full description &raquo;</a>');

    $('.event-description a.readmore').click(function(e){
      e.preventDefault();
      $('.event-description-long').slideDown(500);
      $('.event-description-long').fadeTo(200, 0.5, function() { $('.event-description-long').fadeTo(400, 1); }); //flash it so the user sees it ...
      $('.event-description a.readmore').fadeTo(200, 0);

    });

  });

}(jQuery));  
