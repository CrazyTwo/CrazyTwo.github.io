$(function(){
	var img = $('.image img');
	var $banner = $('.inner .banner img');
	var $inner = $('.inner');
	var $tab = $('.tab');
	var $tomax = $('.tomax');
	var i = 0;
	var timer = null;
	var arrH = [];
	var $img = $('.image div');
	for (var j=0;j<$banner.length;j++) {
		var $span = $('<span></span>');
		$tab.append($span);
	}
	for(var j = 0; j< $img.length;j++){
		var $maximg = $('<p class="maximg"><img src="img/tomax.png"/></p>')
		$img.eq(j).append($maximg);
	}
	var $span = $('.tab span');
	//大图切换部分
	loadImageFn($banner,'',function(){
		play();
		listTab();
		$span.eq(0).css('background','darkorange');
		//点击圆点切换图片 --start
		$span.on('click',function () {
			timer && clearInterval(timer)
			if (i != $(this).index()) {
				fadeTab($(this).index(),i,1000);
			}
			i = $(this).index();
			play();
		})
		//手动大图切换 --start
		//PC端 --start
		$banner.parent().mousedown(function(e){
			var disX = e.pageX;
			$(document).on('mousemove',function(e){
				var $which =  e.pageX-disX>0;
				whichFn($which);
			})
			e.stopPropagation();
			e.preventDefault();
		})
		$(document).mouseup(function(){
			$(document).off('mousemove');
			$banner.bolL = false;
			$banner.bolR = false;
			play();
		})//PC端 --end
		//手机端 --start
		$banner.parent().on('touchstart',function(e){
			var disX = e.touches[0].pageX;
			$(document).on('touchmove',function(e){
				var $which =  e.touches[0].pageX-disX>0;
				whichFn($which);
				e.preventDefault();
			})
			e.stopPropagation();
			e.preventDefault();
		})
		$(document).on('touchend',function(){
			$(document).off('touchmove');
			$banner.bolL = false;
			$banner.bolR = false;
			play();
		})//手机端 --end
	//手动大图切换 --end
	})//大图切换部分 --end
	//瀑布流部分 --start
	loadImageFn(img,'',function(){
		changeFn($img);
		$('.loading').hide();
		//屏幕大小改变时
		$(window).resize(
			function(){
				listTab();
				changeFn($img);
				tomaxInit();
			}
		)
		//鼠标经过离开瀑布流图片时
		$img.hover(function(){
			 $(this).find('.maximg').css({
				width:'100%',
				height:'100%',
				position:'absolute',
				left:0,
				top:0,
				background:'rgba(0,0,0,0.7)'
			})
			$(this).find('.maximg').stop().fadeIn(1000);
		},function(){
			$(this).find('.maximg').stop().fadeOut(1000);
		});
		//点击放大时
		 $img.find('.maximg').on('click',function(){
			var $src = $(this).parent().find('img').eq(0).attr('src');
			$tomax.css({
				width:$(window).width(),
				height:$(window).height()
			})
			$tomax.find('img').attr('src',$src).on('load',function(){
				tomaxInit();
			});
			$tomax.show();
		})
		 //点击放大界面时
		$tomax.on('click',function(){
			$tomax.hide();
		})
	})
	//用户操作切换大图（左右移动）
	function whichFn($which){
		//判断右移
		if($banner.bolR && $which){return}
		//判断左移
		if($banner.bolL && !$which){return}
		timer && clearInterval(timer)
		var per = i;
		if ($which) {
			//记录右移
			$banner.bolR = true;
			$banner.bolL = false;
			i++;
			if (i>2) {per = 2;i = 0;}
		}else{
			//记录左移
			$banner.bolR = false;
			$banner.bolL = true;
			i--;	
			if (i<0) {per = 0;i = 2;}
		}
		//执行淡入淡出
		fadeTab(i,per,1000);
	}
	//初始化放大界面样式
	function tomaxInit(){
			//判断图片是否超过最大宽度 $tomax.width()*0.7
		if ($tomax.find('img').width()>=$tomax.width()*0.7) {
			$tomax.find('img').css({
				width:$tomax.width()*0.7,
				height:'auto'
			})
		} 
		//判断图片是否超过最大高度 $tomax.height()*0.7
		if($tomax.find('img').height()>=$tomax.height()*0.8){
			$tomax.find('img').css({
				height:$tomax.height()*0.8,
				width:'auto'
			})}
			// console.log($tomax.find('img').height(),$tomax.height()*0.7);
		
		
	}
	//初始化大图的圆点样式(响应式)
	function listTab(){
		//初始化大图切换最外框的高度
		$inner.css({
			height:$banner.height()
		})
		//圆点大小
		var sW = 10;
		//圆点父级大小
		var tW = 50;
		//圆点父级样式
		$tab.css({
			height:tW/$banner.height()*100+'%',
			margin:'auto'
		});
		//圆点样式
		$span.css({
			background:'#fff',
			opacity:'.5',
			float:'left',
			height:sW/$tab.height()*100+'%',
			borderRadius:'50%',
			marginRight:sW/$tab.height()*100+'%'
		})
		$span.css({
			width:$span.height(),
			marginTop:($tab.height()-$span.height())/2
		});
		//最后一个圆点样式
		$span.eq($banner.length-1).css({
			marginRight:0
		})
		//圆点父级宽度样式
		$tab.css('width',$span.width()*($banner.length*2))
	}
	//淡入淡出动画
	function fadeTab(k,per,t) {
		//设置只有上一张显示，其他隐藏
		$banner.not($banner.eq(per)).css('display','none');
		//当前张淡入
	 	$banner.eq(k).css('z-index',1).stop().fadeIn(t)
	 	//上一张淡出
	 	$banner.eq(per).stop().fadeOut(t);
	 	//设置圆点对应样式
	 	$span.not($span.eq(k).css('background','darkorange')).css('background','#fff');
	 }
	//自动淡入淡出
	function play(){
		clearInterval(timer)
		var per = 0;
		timer = setInterval(function(){
			//记录上一张
			per = i;
			//记录下一张
			i++;
			if (i>=3) {
				per = 2
				i = 0;
			}
			//执行动画
			fadeTab(i,per,1000);
		},2000);
	}
	//图片预加载
	function loadImageFn (arr,fn,over) {
		var index = 0;//加载第几张
		for (var i=0; i < arr.length; i++) {
			var img = new Image();//定义一个图片的对象
			img.src = arr.eq(i).attr('src');//设置路径
			img.onload = function(){
				index ++; //加载
				if (index == arr.length) {//图片加载完成后
					over && over();//结束回调函数
				}
				fn && fn(index);//过程回调函数
			}
		}
	}
	//瀑布流位置初始化
	function changeFn($div){
			//获取瀑布流父级宽度
			var winW = $div.parent().width();
			//设置右间隔
			var marginR = winW*0.01;
			//设置下间隔
			var marginB = $div.find('img').height()*0.08;
			//计算一行几张图
			var num = Math.floor(winW/($div.width()+marginR))
			//循环所有图片设置位置（使用了定位）
			for (var i =0;i<$div.length;i++) {
				if (i<num) {//第一行时
					$div.eq(i).css({
						top:marginB,
						left:i*($div.width()+marginR),//i*（div宽度+间隔）
						height:$div.eq(i).find('img').height()//图片高度
					})
					arrH[i] = $div.eq(i).find('img').height()+2*marginB;//高度+间隔录入数组，以便排位
				}else{//其他行时
					var min = findMin(arrH);//最小高度的位置
					$div.eq(i).css({
						top:arrH[min],//最小高度
						left:min*($div.width()+marginR),//位置*（div宽度+间隔）
						height:$div.eq(i).find('img').height()//图片高度
					})
					arrH[min] +=  $div.eq(i).find('img').height()+marginB;//最小高度+当前高度+间隔录入数组，以便排位
				}
			}
			//设置瀑布流父级的高度
			$div.parent().css({
				height:Math.max.apply(null,arrH)
			})
		}
	//找最小的位置值
		function findMin(arr){
			//获取最小值
			var a = Math.min.apply(null,arr);
			for (var i = 0; i < arr.length; i++) {
				if (a == arr[i]) {//判断获取最小值的位置
					return i;
				}
			}
		}
})