// This JS adds responsive menus.
// It's not ideal MVF, but we have to do it like this 
// as we can't modify the source HTML as this is an interim fix.

// jQuery( document ).ready(function() {
// (function responsifyGlobalMenus() {

function responsifyPageSpecific(qMarkPos,trail) {

	// var qMarkPos = window.location.href.toString().split('/')[3].indexOf("?");
	// var trail = qMarkPos > -1 ? window.location.href.toString().split('/')[3].substring(0, qMarkPos) : window.location.href.toString().split('/')[3];


	switch(trail) {	// Target specific trail e.g.: /training
		case 'about':
			// about/people page search form needs local-search id
			// jQuery('#people-groups').attr("id", "local-search");
			jQuery('#local-search-mobile').remove();

			// ungroup event topic links
			jQuery('body.page-about-events .set a').unwrap();

			break;
		case 'support':
			// support isn't drupal and is a real jerk
      var activeTrail = '#masthead-mobile-' + 'services';      
      jQuery(activeTrail).addClass('active');
      jQuery('#local-title h1').text(jQuery('#masthead-mobile a.active').text());
			break;
		case 'training':
			var newTrainingFilters    = '<div id="training-filters-mobile">' +
		    '<a href="#" id="more-training-filters" class="flyout-nav">Filters <span class="arrow down black"></span></a>' +
		    '</div>';
			
		    //if the page has training filters
		    if (jQuery('body').find('#ebi-training-filters-filters-form').length == 1) {
		  	  jQuery('.content:first').prepend('<div class="third-level">'+newTrainingFilters+'</div>'); // Set filters for Training
		  	  // Hide Training filters Heading
		  	  jQuery('body').find('#ebi-training-filters-filters-form').parent().find('h3').hide()
		    }
		
		    // User has asked to open a menu
		    jQuery('.section-training .flyout-nav').click(function(e) {
		    	// which menu do we want to show?
	        lastMenuUsed = targetMenus.indexOf(jQuery(this).data('mobile-menu-id'));
	        var clickedButtonTarget = jQuery(this).data('mobile-menu-id');
	        var clickedButton       = jQuery(clickedButtonTarget).data('mobile-menu-parent-id');
	        
		    	switch(clickedButton) {
		        case '#more-training-filters':	// Shift filters
		      	  jQuery(clickedButtonTarget).css({"top":'1em',"left":'-10px'}) //reset
		          jQuery(clickedButtonTarget).offset(jQuery(clickedButton).offset());
		      	  
		      	  // visual feedback
		          jQuery(this).find('.arrow').toggleClass('down').toggleClass('up');
		          jQuery(this).toggleClass('active');
	
		          // show the menu
		          jQuery(clickedButtonTarget).toggle();
		        break;
		        
		        case '#more-in-this-section':
		        case '#more-in-this-page':
		        	// close all other menus
		            for (var i = 0; i < targetMenus.length; i++) {
		              if (i != lastMenuUsed) closeMenus(i);
		            }
		            break;
		            
		    	}
		 
		        return false;
		    })

			// Training toggles 
			jQuery('body.page-training.subsection-overview .panels-flexible-column-training_search-18').addClass('training-events-tab-pane tab-pane');
			jQuery('body.page-training.subsection-overview .panels-flexible-column-training_search-20').addClass('train-online-tab-pane tab-pane');

			jQuery('.training-events-tab-pane').parent().prepend('<div class="tabs"><a href="#" class="active training-events-tab">Training events</a> <a href="#" class="train-online-tab">Train online</a></div>');
			// jQuery('.training-events-tab-pane').parent().addClass('tab-parent');
			jQuery('.train-online-tab-pane').hide();

			jQuery('.tabs a').click(function(e) { 

				jQuery('.tabs a').removeClass('active');
				jQuery(this).addClass('active');

				jQuery('.tab-pane').hide();

				if (jQuery(this).hasClass('training-events-tab')) { jQuery('.training-events-tab-pane').show(); }
				if (jQuery(this).hasClass('train-online-tab')) { jQuery('.train-online-tab-pane').show(); }

				event.preventDefault();

			});
			break;
	}
}
// })();
// });
