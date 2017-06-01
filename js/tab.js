
	//------------------------------------------------------------------------------
	//PURPOSE : 우측 따라다니는 장바구니
	//CREATE  : 
	//MODIFY  :
	//------------------------------------------------------------------------------
	var cw, cl;
	line = 660;
	$(document).ready(function(){
		$(window).on('resize', function() {
			fn_getPosCart();
		}).trigger('resize');
	});

	function fn_getPosCart() {
		cw = $('.side-info').width() + 2;
		cl = $('.side-info').offset().left;

		$('#cart_ui').css('width',cw);
	}

	var browser = "Firefox";
	
	
	$(function(){
		
		
		// 슬라이드 기능 관련
		$('.bxslider').bxSlider({
			pagerCustom: '#bx-pager'
		});
		
		// 리뷰 탭은 시작할때 안보이게 설정
		$('#review').css('display', 'none');
		
		$('#sch_kwd').focus(function(){
			if($(this).val() == '업소명을 검색해주세요'){
				$(this).val("");
			}else{
				return;
			}
		});
		$("#sch_kwd").blur(function(){
			if($(this).val() == ''){
				$(this).val("업소명을 검색해주세요");
			}
			
		});
	});
	
	// 메뉴 버튼 클릭 시 
	function clkMenu(){
		$('#review').css('display', 'none');
		$('#menu').css('display', 'block');
	}
	
	// 리뷰 버튼 클릭 시 
	function clkReview(){
		$('#menu').css('display', 'none');
		$('#review').css('display', 'block');
	}
	
	// 댓글 달기
	// hone**** 부분에 아이디 받아오고 날짜 받아오면 끝
	function sendComment(){
		// 현재날짜 받아오기
		var dt = new Date();
		var month = dt.getMonth()+1;
		var day = dt.getDate();
		var year = dt.getFullYear();
		var today = year + '-' + month + '-' + day;
		var text = $('#reply_area').val();
		$('.reply-row').append('<br/><hr/><br/><strong class="nick">hone****</strong> <em>|</em><time datetime="2017-04-01" pubdate>'+today+'</time><p>'+text+'</p><br/>');
		
		$('#reply_area').val('');
		CloseInfo('pop1');
		alert('댓글이 작성되었습니다.');
	}
	