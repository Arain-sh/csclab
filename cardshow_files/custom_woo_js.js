jQuery.noConflict();


jQuery(document).ready(function($){
	

"use strict";

$('body').on('added_to_cart', shopping_cart_dropdown_show);
	$('body').on('click', '.custom_cart_button .add_to_cart_button', function()
	{
		var product = $(this).parents('.product:eq(0)').addClass('adding_to_cart_working').removeClass('adding_to_cart_completed');
	})

	$('body').bind('added_to_cart', function()
	{
		$('.adding_to_cart_working').removeClass('adding_to_cart_working').addClass('adding_to_cart_completed');
	});
var timeout;

var productToAdd;

//notification
$('body').on('click','.custom_cart_button .add_to_cart_button', function(){
	productToAdd = $(this).parents('li').find('h3').text();
	$('#header_container .cart-notification span.item-name').html(productToAdd);
	$('#top_bar .cart-notification span.item-name').html(productToAdd);
	//if($('.cart-menu-wrap').hasClass('first-load')) $('.cart-menu-wrap').removeClass('first-load').addClass('static');
});


function shopping_cart_dropdown_show(e) {
		
		clearTimeout(timeout);
		
		if(!$('.widget_shopping_cart_content .cart_list .empty').length && $('.widget_shopping_cart_content .cart_list').length > 0 && typeof e.type != 'undefined' ) {
			//before cart has slide in
			if(!$('#header_container .cart-notification').is(':visible')) {
				$('#header_container .cart-notification').fadeIn(400);				
				$('#header_container .cart-notification').addClass('notification_on');
			} else {
				$('#header_container .cart-notification').show();
			}
			if(!$('#top_bar  .cart-notification').is(':visible')) {
				$('#top_bar  .cart-notification').fadeIn(400);				
				$('#top_bar  .cart-notification').addClass('notification_on');
			} else {
				$('#top_bar  .cart-notification').show();
			}
			timeout = setTimeout(hideCart,2700);

			$('.cart-menu a, .widget_shopping_cart a').addClass('no-ajaxy');
		}
}

function hideCart() {
	$('#header_container .cart-notification').removeClass('notification_on');
	$('#header_container .cart-notification').stop(true,true).fadeOut();
	
	$('#top_bar .cart-notification').removeClass('notification_on');
	$('#top_bar .cart-notification').stop(true,true).fadeOut();
}
	

});
