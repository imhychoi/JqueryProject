/* select box */

(function($){
	$.fn.extend({
		customStyle : function(options) {
			//if(!$.browser.msie || ($.browser.msie&&$.browser.version>6)){
				return this.each(function() {
					var currentSelected = $(this).find(':selected');
					$(this).after('<span class="select-style"><span class="select-style-inner">'+currentSelected.text()+'</span></span>').css({position:'absolute', opacity:0,fontSize:$(this).next().css('font-size')});
					var selectBoxSpan = $(this).next();
					var selectBoxWidth = parseInt($(this).width());   
					var selectBoxSpanInner = selectBoxSpan.find(':first-child');
					selectBoxSpan.css({display:'inline-block'});
					selectBoxSpanInner.css({width:selectBoxWidth, display:'inline-block'});
					var selectBoxHeight = parseInt(selectBoxSpan.height()) + parseInt(selectBoxSpan.css('padding-top')) + parseInt(selectBoxSpan.css('padding-bottom'));
					$(this).height(selectBoxHeight).change(function(){
						selectBoxSpanInner.text($(this).find(':selected').text()).parent().addClass('changed');
					});
				});
			//}
		}
	});
})(jQuery);

$(function(){
	// selectbox styling
	$('select').not('.except').customStyle();
	
	// mobile check app-down display
	var mobileChk = navigator.userAgent; 
	if ((mobileChk.indexOf("iPhone") > 0 || mobileChk.indexOf("iPod") > 0 || mobileChk.indexOf("iPad") > 0 || mobileChk.indexOf("Android ") > 0 )) $('#mobile').show();
	
	// mainpage over animation
	overAnimate();
	
	// category 열기
	cateOverAct();
	
	// set appdown area - main 
	getHeightGoApp();
	
	// images loading error
	$('img').each(function(){
		$(this).error(function(){
			$(this).attr('src','https://img.woowahan.com/www/common/bg-noimg.png').addClass('noimg');
		})
		.each(function(){
  		$(this).attr('src',$(this).attr('src'));
		});
	});
});

$(document).ready(function(){
	$(window).on('resize', function() {
  	setFooterPos();
	}).trigger('resize');
});

// rating
function rating(obj,rate) {
	var $this = $(obj);
	$this.parent().siblings().find('.inner_star').css('width',''+rate+'%');
}
	
// close option panel
function closePanel(obj) {
	var $this = $(obj);
	$this.parent().parent().parent().collapse('hide');
}
	
// open recommend menu
function openPanel(obj) {
	$this = $(obj);
	$this.collapse('show').parents('.panel-collapse').collapse('show');
	scrollhere(obj);
}
function scrollhere(destination){
  var stop = $(destination).offset().top - 80;
  var delay = 500;
  $('body,html').animate({scrollTop: stop}, delay);
  return false;
}

// open layer
function openLayer(obj) {
	$('.'+obj).show();
	$('.visible').hide();
	$('.visibleicon').removeClass('fold visibleicon');
}

// close layer
function closeLayer(obj) {
	$('.'+obj).hide();
}

// toggle layer
function toggleLayer(obj,target) {
	//var target = (window.event) ? window.event.srcElement : event.target
	if((obj == 'gnb' || obj == 'cate-srch' || obj == 'sinfo') && $(window).width() >= 767) {
		return false;
	} else {
		if($('.'+obj).is(':hidden')) {
			$('.'+obj).show().addClass('visible');
			$('.'+target).addClass('fold visibleicon');
			$('.visible').not($('.'+obj)).hide();
			$('.visibleicon').not($('.'+target)).removeClass('fold visibleicon');
			if(obj == 'dong-srch' ) {
				$('#sch_addr').focus();
			}
		} else {
			$('.'+obj).hide();
			$('.'+target).removeClass('fold');
			if(obj == 'dong-srch' ) {
				$('#sch_addr').blur();
			}
		}
	};
}

// open category area
var isMouseOver = false;
function cateOverAct() {
	if($('.category-set').hasClass('main')) {
		return false;
	} else {
		$('.category-set').mouseenter(function(e){
			isMouseOver = true;
			setTimeout(openCategory,300);	
		});
		$('.category-set').mouseleave(function(){
			isMouseOver=false;
			openCategory();
		});
	}
}
function openCategory() {
	if($(window).width() >= 767) { 
		if(isMouseOver) {
			$('.cate-area ul').stop().animate({height: 208}, 300);
		} else {
			$('.cate-area ul').stop().animate({height: 110}, 300);
		}
	} else {
		return false;
	}
	$(window).on('resize', function() {
		if($(window).width() < 767) {
  		$('.cate-area ul').css('height','auto');
  	}
	}).trigger('resize');
};

// mainpage over animation
var posX, posY;
function getDirection(ev,obj,state) {
var	w = $(obj)[0].offsetWidth,
		h = $(obj)[0].offsetHeight,
		x = (ev.pageX - $(obj).offset().left - (w / 2) * (w > h ? (h / w) : 1)),
		y = (ev.pageY - $(obj).offset().top - (h / 2) * (h > w ? (w / h) : 1)),
		d = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180 ) / 22.5 ) + 15 )  % 16;
		
		switch(d) {
			case 1 :
				posX = -w;
				posY = -h;
				break;
			case 2 :
				posX = -(w/2);
				posY = -h;
				break;
			case 3 :
				posX = 0;
				posY = -h;
				break;
			case 4 :
				posX = w/2;
				posY = -h;
				break;
			case 5 :
				posX = w;
				posY = -h;
				break;
			case 6 :
				posX = w;
				posY = -(h/2);
				break;
			case 7 :
				posX = w;
				posY = 0;
				break;
			case 8 :
				posX = w;
				posY = h/2;
				break;
			case 9 :
				posX = w;
				posY = h;
				break;
			case 10 :
				posX = w/2;
				posY = h;
				break;
			case 11 :
				posX = 0;
				posY = h;
				break;
			case 12 :
				posX = -(w/2);
				posY = h;
				break;
			case 13 :
				posX = -w;
				posY = h;
				break;
			case 14 :
				posX = -w;
				posY = h/2;
				break;
			case 15 :
				posX = -w;
				posY = 0;
				break;
			default :
				posX = -w;
				posY = -(h/2);
				break ;
		}
};

function overAnimate() {
	$('.boxm')
	.mouseenter(function(ev){
		getDirection(ev,$(this),'in');
		$(this).find('.cover').css('background-position',''+posX+'px '+posY+'px').stop().animate({
			backgroundPositionX:"0",
			backgroundPositionY:"0"
		}, {duration:300})
	})
	.mouseleave(function(ev){
		getDirection(ev,$(this),'out');
		$(this).find('.cover').stop().animate({
			backgroundPositionX:posX,
			backgroundPositionY:posY
		}, {duration:300})
	});
}

// set footer position
function setFooterPos() {
if($('.container').length > 0) {
	var str = $('.container').css('margin-bottom');
	$('#wrap').css('min-height',$(window).height() - $('footer').height() - str.substr(0,str.length-2));
}
}

// login scrollhere openLayer 
function loginScrollOpen() {
	openLayer('gnb-mem');
	scrollhere('gnb-mem');
}

// set appdown area - main 
function getHeightGoApp() {
	/*
	var h = $(window).height();
	var conth = $('.go-app>div').innerHeight();
	if(conth < h){
		$('.go-app').css('height',$(window).height());
		$('.go-app>div').addClass('abs').css('margin-top', -(conth/2));
	}
	*/
}
