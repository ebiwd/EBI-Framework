/* Copyright (c) EMBL-EBI 2016
   Authors: 
   Ken Hawkins (khawkins@ebi.ac.uk)
*/

// Foundation specific extensions of functionality
(function($) {

  // Clone the local menu into a mobile-only menu
  // -----------
  var localMenuClass = '#local-masthead .masthead > nav ul.dropdown.menu.float-left';
  // var localMenuClass = '#secondary-menu-links'; // temp for testing
  // $(localMenuClass).addClass('dropdown'); // temp for testing
  var localMenuWidthAvail = $('#local-masthead .masthead > nav').width();
  // var localMenuWidthTotal = $(localMenuClass).width();

  function localNavSpilloverMenu(changeDirection) {
    var localMenuWidthUsed = 0;
    var localMenuWidthNotUsed = localMenuWidthAvail;
    var localMenuRightSideWidth = $('#local-masthead .masthead > nav ul.float-right.menu').width(); // width of any right-side nav, this could change on browser resize
    localMenuRightSideWidth = localMenuRightSideWidth + 5; // padding

    // Calculate how much space we need, if any
    $(localMenuClass+' > li').each( function() {
      localMenuWidthUsed = localMenuWidthUsed + $(this).width();
    });

    // account for any float-right menu
    // to do: account for any float-right menu
    localMenuWidthNotUsed = localMenuWidthNotUsed - localMenuRightSideWidth;

    // do we need to make space?
    if (changeDirection != 'increase') {
      if (localMenuWidthUsed > localMenuWidthNotUsed) {
        // create dropdown if needed
        if ($(localMenuClass + ' li.extra-items-menu').length == 0) { 
          $(localMenuClass).append('<li class="extra-items-menu"><a href="#">Also in this section</a><ul class="menu"></ul></li>');
          // to do: should we be invoking foundation to create/destroy the dropdown functionality when we add/remove the menu?
          localMenuWidthUsed = localMenuWidthUsed + $(localMenuClass + ' li.extra-items-menu').width();
        }

        // loop through each menu item in reverse, and slice off the first as it's the dropdown
        $($(localMenuClass+' > li').get().reverse().slice(1)).each( function() {
          if (localMenuWidthUsed > localMenuWidthNotUsed) { // do we need to hide more items?
            localMenuWidthUsed = localMenuWidthUsed - $(this).width();
            $(this).detach().prependTo(localMenuClass + ' li.extra-items-menu ul.menu');
          } // we could break when <= but this should be pretty fast
        });
      } 
    }

    if (changeDirection == 'increase') {

      // does the dropdown exist?
      if ($(localMenuClass + ' li.extra-items-menu').length > 0) { 

        // if the menu is shorter than full width, we can perhaps restore some menu items from the dropdown

        // if we delete the menu
        localMenuWidthNotUsed = localMenuWidthNotUsed + $(localMenuClass + ' li.extra-items-menu').width();

        // console.log('if delete drop down, we have free space of',localMenuWidthNotUsed);

        if ($(localMenuClass + ' li.extra-items-menu li').length == 0) { 
          // if the dropdown is empty, remove it
          $(localMenuClass + ' li.extra-items-menu').remove();
        }
      }
    }  

  }

  localNavSpilloverMenu('init');
  // re-calc menus on browser change, if it affect width of localMenuWidthAvail
  $(window).resize( function() {
    var widthChangeAmount = $('#local-masthead .masthead > nav').width() - localMenuWidthAvail;
    if (widthChangeAmount != 0) localMenuWidthAvail = $('#local-masthead .masthead > nav').width();
    // we look for changes of more than 1 to reduce jitter
    if (widthChangeAmount > 1)  localNavSpilloverMenu('increase');
    if (widthChangeAmount < 1)  localNavSpilloverMenu('decrease');
  });

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
