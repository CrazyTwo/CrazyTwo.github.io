
var btn=$(".top .l p");
var mav_L=$('#mav_l ul');
var mav_L_li=$('#mav_l li');

var maun=$("#maun");
var mav_R=$('#mav_r');
var mav_R_li=$('#mav_r li');
var oSearch = $('.search');
var gwc=$('#gwc');


$('#maun2').click(function(){
	 window.location.href="search.html";
});
$('#sousu').focus(function(){
	 window.location.href="html/search.html";
});
oSearch.focus(function(){
	 window.location.href="search.html";
});
mav_L_li.on("touchstart",function(e){
	btn.html($(this).html());
	mav_L.hide();
	e.stopPropagation();
})
btn.on("touchstart",function(e){
	mav_L.show();
	mav_R.hide();
	e.stopPropagation();
})

mav_R_li.on("touchstart",function(e){
	mav_R.hide();
	e.stopPropagation();
})
maun.on("touchstart",function(e){
	mav_R.show();
	mav_L.hide();
	e.stopPropagation();
})

$(document).on("touchstart",function(){
	mav_L.hide();
	mav_R.hide();
})


var time1=0;
gwc.on('touchstart',function(e){
	time1=new Date();
	mav_L.hide();
	mav_R.hide();
	gwc.on("touchmove",function(e){
		var x=e.touches[0].clientX-gwc.width()/2;
		var y=e.touches[0].clientY-gwc.height()/2;
		if(x<=0){x=0}else if(x>=$(window).width()-gwc.width()){x=$(window).width()-gwc.width()}
		if(y<=0){y=0}else if(y>=$(window).height()-gwc.height()){y=$(window).height()-gwc.height()}
		gwc.css("left",x);
		gwc.css("top",y);
		e.preventDefault();
	})
	e.preventDefault();
})
gwc.on('touchend',function(){
	var time2=new Date();
	if(time2-time1<150){
		window.location.href="html/buyCar.html";
	}
})


var time1 =$('.time1');
var time2 =$('.time2');
var newtime = new Date()
Countdown(time1,11888640,newtime)
Countdown(time2,1888640,newtime)

var date1=setInterval(function () {
	Countdown(time1,11888640,newtime)
	if(time1.eq(0).html()<=0 && time1.eq(1).html()<=0 && time1.eq(2).html()<=0){
		clearInterval(date1)
	}
	},1000)
var date2=setInterval(function () {
	Countdown(time2,1888640,newtime)
	if(time2.eq(0).html()<=0 && time2.eq(1).html()<=0 && time2.eq(2).html()<=0){
		clearInterval(date2)
	}
	},1000)

	//倒计时函数
	function Countdown(obj,time,newtime) {
		var oDate = new Date()//当前时间
		var d = new Date((newtime).valueOf()+time);//预定时间
		var time = parseInt((d-oDate)/1000);//相差时间戳
		var h = parseInt(time%86400/3600);//小时数
		var m = parseInt(time%3600/60);//分
		var s = parseInt(time%60);//秒
		obj.eq(0).html(fix(h,2))
		obj.eq(1).html(fix(m,2))
		obj.eq(2).html(fix(s,2))
	}
	//保留两位整数的函数
	function fix(num, length) {
  return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}
