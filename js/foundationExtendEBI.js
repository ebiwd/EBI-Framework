/* Copyright (c) EMBL-EBI 2016
   Authors: 
   Ken Hawkins (khawkins@ebi.ac.uk)
*/

// Foundation specific extensions of functionality
(function($) {

  // Clone the local menu into a mobile-only menu
  // -----------
  var localMenuClass = 'ul.dropdown.menu.float-left';
  // var localMenuClass = '#secondary-menu-links'; // temp for testing
  // $(localMenuClass).addClass('dropdown'); // temp for testing
  // var localMenuOption = $(localMenuClass).html();
  var howManyMenuItems = $(localMenuClass+' > li').length;
  var localMenuTop = $(localMenuClass+' > li').first().offset().top;  
  var localMenuHiddenItems = 0;

  // todo: run this on browser resize events

  // Hide any menu items on a second line
  // loop through each item in reverse
  $($(localMenuClass+' > li').get().reverse()).each( function() {

    if ($(this).hasClass('extra-items-menu') == false) { // dont try to hide the dropdown menu item

      if (($(this).offset().top - localMenuTop) == 0) { // is it on the same line as the first item?
        if (localMenuHiddenItems > 0) {
          // if we've had to hide items, hide on more to make space for dropdown
          $(this).detach().prependTo('li.extra-items-menu ul.menu');
        }
        // once we've found a menu item on the top line, no need to do anything more
        return false;
      } else {
        localMenuHiddenItems ++;
        // Create the dropdown after the first item is hidden
        if ((localMenuHiddenItems == 1) && ($('li.extra-items-menu').length == 0)) {
          $(localMenuClass).append('<li class="extra-items-menu"><a href="#">Also in this section</a><ul class="menu"></ul></li>');
        }
        $(this).detach().prependTo('li.extra-items-menu ul.menu');
      }
    }
  });

  if (localMenuHiddenItems == 0) {
    // console.log('no need to hide any further items.')
    // to do: we should move items back if we can... but would like to do so 'smartly'
    // need to know how wide the next item is, and how much space we have...
    // we could append one item and rerun the hide function ...
  }

  // Clearable text inputs
  // via: http://stackoverflow.com/questions/6258521/clear-icon-inside-input-text 
  // -------------
  function tog(v){return v?'addClass':'removeClass';} 
  $(document).on('input', '.clearable', function(){
    $(this)[tog(this.value)]('x');
  }).on('mousemove', '.x', function( e ){
    $(this)[tog(this.offsetWidth-25 < e.clientX-this.getBoundingClientRect().left)]('onX');
  }).on('touchstart click', '.onX', function( ev ){
    ev.preventDefault();
    $(this).removeClass('x onX').val('').change().keyup();
  });

  $.fn.foundationExtendEBI = function() {
    // Link overlay images
    $(function() {
      $('.with-overlay').click(function(e) {
        var href = $(this).find('a:first').attr('href') || '';
        if (href.length > 0) {
          window.location.href = href;
        }
      })
    });

    // Responsive support for tables
    // Clone the class from a parent TH to any child TD
    jQuery('table.responsive-table').each( function() {
      var columnsToAppend = jQuery(this).find('th');
      for (var i = 0; i < columnsToAppend.length; i++) {
        if (jQuery(columnsToAppend[i]).attr('class')) {
          var position = i + 1;
          jQuery(this).find('td:nth-child('+position+')').addClass(jQuery(columnsToAppend[i]).attr('class'));
        }
      };
    });

    // Smooth scroll anchor links for jQuery users
    $(function() {
      $('a[href*=#]:not([href=#])').click(function() {
        // Table compatibility
        if ($(this).parent().parent().hasClass('tabs')) {
          return true; //exit
        }
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash),
              targetName = this.hash;
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, {
              duration: 1000,
              complete: function(){ window.location.hash = targetName; }
            });
            return false;
          }
        }
      });
    });
  }

}(jQuery));
