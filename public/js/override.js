$('.fades').vegas({
    slides: [
        { src: '/img/pic1.jpg' , valign:'center' ,transition:'fade'},
        { src: '/img/pic2.jpg' , valign:'center' ,transition:'fade'},
        { src: '/img/pic3.JPG' , valign:'center' ,transition:'fade'}
    ],
    cover:'true',
    transitionDuration:3000,
    delay:7000,
    overlay: "/img/overlays/05.png"
});

   $('.news-feed').vTicker('init', {speed: 400, 
    pause: 1000,
    showItems: 1,
    padding:4});

$('#carousels').elastislide( {
        orientation : 'vertical',
        minItems : 1,
      });


(function($) {    
  if ($.fn.style) {
    return;
  }

  // Escape regex chars with \
  var escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  // For those who need them (< IE 9), add support for CSS functions
  var isStyleFuncSupported = !!CSSStyleDeclaration.prototype.getPropertyValue;
  if (!isStyleFuncSupported) {
    CSSStyleDeclaration.prototype.getPropertyValue = function(a) {
      return this.getAttribute(a);
    };
    CSSStyleDeclaration.prototype.setProperty = function(styleName, value, priority) {
      this.setAttribute(styleName, value);
      var priority = typeof priority != 'undefined' ? priority : '';
      if (priority != '') {
        // Add priority manually
        var rule = new RegExp(escape(styleName) + '\\s*:\\s*' + escape(value) +
            '(\\s*;)?', 'gmi');
        this.cssText =
            this.cssText.replace(rule, styleName + ': ' + value + ' !' + priority + ';');
      }
    };
    CSSStyleDeclaration.prototype.removeProperty = function(a) {
      return this.removeAttribute(a);
    };
    CSSStyleDeclaration.prototype.getPropertyPriority = function(styleName) {
      var rule = new RegExp(escape(styleName) + '\\s*:\\s*[^\\s]*\\s*!important(\\s*;)?',
          'gmi');
      return rule.test(this.cssText) ? 'important' : '';
    }
  }

  // The style function
  $.fn.style = function(styleName, value, priority) {
    // DOM node
    var node = this.get(0);
    // Ensure we have a DOM node
    if (typeof node == 'undefined') {
      return this;
    }
    // CSSStyleDeclaration
    var style = this.get(0).style;
    // Getter/Setter
    if (typeof styleName != 'undefined') {
      if (typeof value != 'undefined') {
        // Set style property
        priority = typeof priority != 'undefined' ? priority : '';
        style.setProperty(styleName, value, priority);
        return this;
      } else {
        // Get style property
        return style.getPropertyValue(styleName);
      }
    } else {
      // Get CSSStyleDeclaration
      return style;
    }
  };
})(jQuery);
$(document).on( 'scroll', function(){
    var pos = $(document).scrollTop();
    var pos2 = $(window).scrollTop();
    var pos3 = $(window).height();
    $('.vegas-timer').css({'bottom': pos + 'px','position':'absolute'});
    var checklogo=0;
    if(pos+81>pos3){
        $('.nav-menu').css({'position':'fixed','background':'rgba(0,0,0,0.5)','top':'0','left':'0','width':'100%','margin-top':'0px','transition':'top 1s'});
        $('.main-content').css('margin-top','100vh');  
    }
        
    else{
        $('.nav-menu').css({'position':'relative','background':'rgba(0,0,0,0)','top':'-80px','margin-top':'100vh','padding-left':'0px'});
        $('.main-content').css('margin-top','-90px');
        
    }
    console.log(pos3-pos)
    if(pos3-pos<500){
       $('.partial-date').style('opacity','0','important').css('transition','opacity .3s ease');

    }else{
      $('.partial-date').style('opacity','1')
    }
    if(pos+174>pos3){/*logo nitk fades*/
         $('.nitklogo').css({'opacity':'0','transition':'opacity .3s ease'})
    }else{
        $('.nitklogo').css('opacity','1')
    }
    if(pos+120>pos3){/*logo asce fades*/
          $('.ascelogo').css({'top':'0px','transition':'top .8s ease'});
    }else{
        $('.ascelogo').css('top','20px');
    }

    if(pos+166>pos3){
        $('.ascelogo').css({'left':'20px','transition':'left .5s ease, top .5s ease'});
    }
    else{
        $('.ascelogo').css({'left':'3%','top':'20px','transition':'left .5s ease, top .5s ease'});
    }
    if(pos+143>pos3){
        $('.nav-menu').style('padding-left','256px','important').css('transition','padding .6s ease');
    }else{
         $('.nav-menu').style('padding-left','0px','important').css('transition','padding .6s ease');
    }
});


( function( $ ) {
    var s = skrollr.init({
    });
} )( jQuery );