$.fn.extend({
	mousewheel:function(cb) {
		if (navigator.userAgent.indexOf("Firefox")>-1) {
			$(this).get(0).addEventListener("DOMMouseScroll",fn);
		}else{			
			$(this).get(0).onmousewheel = fn;
		}
		function fn(e) {
			var e = e || window.event;
			var down = true;
			if (e.detail) {				
				down=e.detail>0;
			}else {
				down=e.wheelDelta<0;
			}		
			cb.apply($(this).get(0),[e,down])
			if (e.preventDefault) {
				e.preventDefault();
			}
			return false;
		}
	},
	scrollMove:function(end,animationFn,fn) {
		var start = $(window).scrollTop();
		var change = end-start;
		var t = 0;
		var endT = 30;
		var timer = setInterval(function () {
			t++;
			if (t>=endT) {
				clearInterval(timer);
				fn && fn();
			}
			var sTop = (animationFn && animationFn(t,start,change,endT)) || start+t/endT*change;

			$(window).scrollTop(sTop);
		},30)
	},
	imgEnlarge:function(style) {
		//获取大图图片，如果没有用小图
		var src= $(this).attr('maxsrc')|| $(this).attr('src');
		//小图结构
		var $min = $('<div class="min"><div></div></div>');

		mStyle = {
			minImgW:400,
			divW:150,
			maxW:500
		}
		//mStyle里面添加style的属性，如果重复的会覆盖
		style = $.extend(mStyle,style)

		//大图结构
		var $max = $('<div class="max"><img src="'+src+'" alt=""></div>')
		var $parent = $(this).parent();
		var $fang = $("<div class='fang'></div>");
		$fang.append($min).append($max);
		$min.append($(this));
		$parent.append($fang);

		//样式
		$(this).css('width',"100%");

		$fang.css({
			width: style.minImgW,
			height: style.minImgW,
			border: "5px solid black",
			position: "relative"
		})
		$min.css('width',"100%")
		$min.find('div').css({
			width: style.divW,
			height: style.divW,
			background: "yellow",
			opacity: 0.5,
			position: "absolute",
			top: 0,
			left: 0,
			display: "none"			
		})
		$max.css({
			width: style.maxW,
			height: style.maxW,
			border: "5px solid black",
			position: "absolute",
			top: "0",
			left: "100%",
			overflow: "hidden",
			display: "none"
		})

		// JS功能
		var $div = $min.find('div');
		//根据比例计算大图宽度
		var scale = $max.width()/$div .width();
		var maxW = scale*$min.width();
		//设置大图宽度
		$max.find('img').width(maxW);
		//移进移出显示隐藏大图
		$min.hover(function() {
			$div.show();
			$max.show();
		},function() {
			$div.hide();
			$max.hide();
		})

		$min.on('mousemove',function(e) {
			var x = e.clientX-$min.offset().left-$div.width()/2;
			var y = e.clientY-$min.offset().top-$div.height()/2;

			if (x<0) {x=0}
			if (x>$min.width()-$div.width()) {
				x=$min.width()-$div.width();
			}
			if (y<0) {y=0}
			if (y>$min.height()-$div.height()) {
				y = $min.height()-$div.height();
			}
			$div.css({left:x,top:y})
			$max.find('img').css({
				marginLeft:-x*scale,
				marginTop:-y*scale
			})
		})

	},
	scrollFn:function() {//
		 	var $wrap = $(this);
		 	//改变结构
		 	var $con = $('<div></div>')
		 	$con.html($wrap.html());
		 	var $scroll = $('<div><div></div></div>');

		 	$wrap.html('');
		 	$wrap.append($con).append($scroll);

		 	var $strip = $scroll.find('div');


		 	//添加样式
		 	$con.css({
		 		paddingRight: "15px",
		 		position: "absolute",
		 		top: 0,
		 	})

		 	$scroll.css({
		 		width: "15px",
		 		background: "#fff",
		 		borderLeft: '1px solid gainsboro',
		 		height: "100%",
		 		position: "absolute",
		 		right: 0,
		 		top: 0,
		 	})
		 	$strip.css({
		 		width: "60%",
		 		background: "rgba(0,0,0,0.3)",
		 		borderRadius:'10px',
		 		position: "absolute",
		 		left:'20%'
		 	})
		 	$strip.hover(function(){
		 		$(this).css("background", "rgba(0,0,0,0.6)")
		 	},function(){
		 		$(this).css("background", "rgba(0,0,0,0.3)")
		 	})


		 	//------自定义滚动条功能方法

		 	//获取比例
		 	var scale = $con.height()/$wrap.height();
		 	if (scale<1) {
		 		$scroll.hide()
		 		$con.css("paddingRight",0)
		 	}
		 	//根据比例计算滚动条高度
		 	var stripH = $scroll.height()/scale;
		 	//限制滚动条高度不能小于30PX
		 	if (stripH<30) {stripH = 30}
		 		console.log(stripH)
		 	$strip.height(stripH);

		 	//拖拽滚动条方法
		 	$strip.on('mousedown',function(e) {
		 		var disY = e.clientY - $(this).position().top;
		 		$(document).on("mousemove",function(e) {
		 			var y = e.clientY - disY;
		 			moveFn(y)
		 		})
		 		e.stopPropagation()//阻止冒泡
		 		e.preventDefault()//阻止默认事件
		 	})

		 	// addEventListener() - on()
		 	// removeEveentListener() - off()

		 	$(document).on("mouseup",function () {
		 		//移除事件方法
		 		$(document).off("mousemove")
		 	})

		 	//移动函数
		 	function moveFn(y) {
		 		if (y<0) {y = 0}
		 		var b = $scroll.height()-$strip.height();
		 		if (y>b) {y=b}

		 		var scale = ($scroll.height()-$strip.height())/($con.height()-$wrap.height());
		 		$con.css('top',-y/scale)
		 		$strip.css("top",y);
		 	}

		 	//滚轮事件，引入了已封好得JQ方法
		 	$wrap.mousewheel(function (e,down) {
		 		if (down) {
		 			var y = $strip.position().top+10
		 		}else{
		 			var y = $strip.position().top-10
		 		}
		 		moveFn(y)
		 	})

		 	$scroll.on("mousedown",function (e) {
		 		var y = e.clientY-$scroll.offset().top-$strip.height()/2;
		 		moveFn(y);
		 	})
		 }
})
var Tween = {
	Linear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	Bounce: {
		easeIn: function(t,b,c,d){
			return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
};