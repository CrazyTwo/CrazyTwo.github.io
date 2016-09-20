$(function(){
	var wrap = $('.wrap');
	var nav = $('.nav p');
	var a = $('.nav div a');
//	onresize = function(){
//		if (wrap.width()<= 850) {
//			a.parent().addClass('list_nav');
//			a.parent().hide();
//		}else{
//			a.parent().removeClass('list_nav');
//			a.parent().show();
//		}
//	}
	a.on('touchstart',function(e){
		e.stopPropagation();
	})
	nav.on('touchstart',function(e){
		a.parent().addClass('list_nav');
		a.parent().stop().slideToggle(1000)
		e.stopPropagation();
	})
	$(document).on('touchstart',function(){
		a.parent().hide();
	})
	
	var share = $('.share p a');
	share.hover(function(){
		$(this).css('background-position',-$(this).index()*25 + 'px -25px')
	},function(){
		$(this).css('background-position',-$(this).index()*25 + 'px 0')
	})
})
