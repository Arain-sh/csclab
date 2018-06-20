/* SORTING */ 
jQuery.noConflict();

jQuery(document).ready(function($){
"use strict";
$("#portfolio-filter li a").click(function () {
$("#portfolio-filter li a").removeClass("active");
$(this).addClass("active");
});


jQuery(function($){

	var $container = $('.portfolio_block');
	$container.isotope({
	itemSelector : '.element',
  	layoutMode : 'packery',
  	animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
       },
	 getSortData: {
      name: '.isotope_portfolio_name',
      date: '.isotope_portfolio_date',
	 }
	});
	// bind sort button click
	$('#sorts').on( 'click', 'li', function() {
    var sortByValue = $(this).attr('data-sort-by');
    $container.isotope({ sortBy: sortByValue });
	});    
  	$('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'li', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
	});
	var $optionSets = $('#options .optionset'),
	$optionLinks = $optionSets.find('a');
	$optionLinks.click(function(){
	var $this = $(this);
	// don't proceed if already selected
	if ( $this.parent('li').hasClass('selected') ) {
	  return false;
	}
	var $optionSet = $this.parents('.optionset');
	$optionSet.find('.selected').removeClass('selected');
	$optionSet.find('.fltr_before').removeClass('fltr_before');
	$optionSet.find('.fltr_after').removeClass('fltr_after');
	$this.parent('li').addClass('selected');
	$this.parent('li').next('li').addClass('fltr_after');
	$this.parent('li').prev('li').addClass('fltr_before');
	// make option object dynamically, i.e. { filter: '.my-filter-class' }
	var options = {},
	key = $optionSet.attr('data-option-key'),
	value = $this.attr('data-option-value');
	// parse 'false' as false boolean
	value = value === 'false' ? false : value;
	options[ key ] = value;
	if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
	  // changes in layout modes need extra logic
	  changeLayoutMode( $this, options )
	} else {
	  // otherwise, apply new options
	  $container.isotope(options);	  
	}	
	return false;	
  });
	$('.masonry').find('img').load(function(){
		$container.isotope('layout');
	}); 	
	
    $container.isotope('layout');
});

});