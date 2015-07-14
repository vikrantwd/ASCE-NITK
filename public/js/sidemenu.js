( function( $ ) {
$( document ).ready(function() {
$('li.has-sub.open ul').css('display','block');
$('#side-sub-menu li.has-sub.open span').addClass('active')
$('#side-sub-menu li.has-sub>a').on('click', function(){
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
			$(this).find('span').removeClass('active');
			element.siblings('li').find('a>span#nav-button').removeClass('active');
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown();
			element.siblings('li').children('ul').slideUp();
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp();
			element.siblings('li').find('a>span#nav-button').removeClass('active');
			$(this).find('span').addClass('active')
		}

	});
});
} )( jQuery );