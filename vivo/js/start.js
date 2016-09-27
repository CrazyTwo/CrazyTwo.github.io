var num=2;
var count=2;
var bol=false;
var time="";
var y;
var rbol=false;
var index=0;
var di="";
var Alottery=["vivo X5pro一台","港囧电影票一套","vivo充电宝一个","vivo耳机一个","签名剧照一张"]
$(".start div").on("touchstart",function(e){
	time=new Date();
	var dis=e.touches[0].clientY;
	console.log(dis)
	var y1=$(".start div").offset().top;
	$(".start div").on("touchmove",function(e){
		var disy=e.touches[0].clientY;
	 	y=disy-dis;
		if(y<=0){
			var top=y+y1;
			$(".start div").css("top",top)
		}
		console.log(y)
		console.log(disy)

	})
})
$(".start div").on("touchend",function(){
	var time2 =new Date();
	if(time2-time<=150 || y<=0){
		audio[1].play();
		audio[1].loop="loop"
		$(".play").show()
		$(".ball").hide();
		$(".start").hide();
		$(".checkpoint").show();
		$(".paly01").show();
		$(".paly02").show();
		$(".paly03").show();
		timeFn(60,function(){
			if(num==7){return}
			$(".fail").show()
		})
		divFn(1,num)
	}

})
//游戏说明
$(".endphone div:nth-child(3)").on("click",function(){
	$(".explain").show()
	gundong()
})
$(".explain .BG img").on("click",function(){
	$(".explain").hide()
})
$(".fail div button:nth-child(4)").on("click",function(){
	$(".explain").show()
	gundong()

})
//再试一次
$(".fail div button:nth-child(3)").on("click",function(){
	$(".fail").hide()
	faiFn()
})
$(".sorry div button").on("click",function(){
	$(".sorry").hide()
	$(".endphone").hide()
	faiFn()
})
function faiFn(){
	num=2;count=2;bol=false;rbol=false;index=0;
	audio[1].play();
	audio[1].loop="loop"
		$(".play").show()
		$(".checkpoint").show();
		$(".paly01").show();
		$(".paly02").show();
		$(".paly03").show();
		$(".play .xuzheng").html('')
		timeFn(60,function(){
			if(num==7){return}
			$(".fail").show()
		})
		divFn(1,num)
}
//抽奖
$(".endphone div:nth-child(2)").on("click",function(){
	var s=rndFn(0,5);
	if(s==5){
		$(".sorry").show()
	}else{
		$(".lottery .BG p:nth-child(2)").html(Alottery[s])
		$(".lottery").show()
	}


})
$(".lottery .BG button").on("click",function(){
	$(".lottery").hide()
})



//动画结束事件
$(".end").on("animationend",function(){
	setTimeout(function(){$(".end").hide();$(".endphone").show()},1000)

})



//合成文字部分
function fontshow1(cb) {
	$con = $('.end p');
	var con = $con.html().trim();
	$con.html('')
	$con.show();
	var arr = con.split('<br>');
	line('',0)
	function line(con,n){
		if (n==arr.length) {return cb($con)}
		var text = arr[n];
		var len = text.length;
		var i = 0;
		show()
		function show(){
			setTimeout(function(){
				i++;
				var txt = con+text.substring(0,i);
//				console.log(txt)
				$con.html(txt);
				if (i>len) {
					return line(txt+"<br>",++n);
				}else{
					show()
				}
			},50)

		}
	}
}

//倒计时
		function timeFn(n,fn){
			clearInterval(di);
			bol=false;
			 di=setInterval(function(){
				n-=0.02;
				if(n<=0){
					clearInterval(di);
					n=0;
					bol=true
					audio[1].pause()
					fn && fn()
				}
				$("span").html(n.toFixed(2))
			},20)
		}

//随机数
		function rndFn(min,max){
			var rnd=Math.round(Math.random()*(max-min)+min);
			return rnd;
		}

//循环添加图片div
		function divFn(n,num,fn){
			var s=rndFn(n,num*num-1)
			for(var i=0;i<num*num;i++){
				if(i==s){
//					是否是最后一关
					if(num==7){
						audio[1].pause()
						var img=document.createElement("img");
						img.src="img/xz.png";
						$(".play .xuzheng").append(img);
						img.onclick=function(){
							index++;
							$(".reward").show();
							audio[5].play();
							audio[5].loop="loop"
							$(".reward div").css("background-image","url(img/reward0"+(count-1)+".png)")
							fontshow1(function(){
									$(".end .merge").show();
									audio[5].pause()
								})
							setTimeout(function(){
								if(rbol){rbol=false;return};
								$(".checkpoint").hide();
								$(".paly01").hide();
								$(".paly02").hide();
								$(".paly03").hide();
								$(".play").hide();
								$(".end").show();

								$(".reward").hide();
							},1000)
							return
						}
					}else{
						var img='<img src="img/xz.png"/>';
						var img=document.createElement("img");
						img.src="img/xz.png";
						$(".play .xuzheng").append(img);
						divOnclickFn(img)
					}
//
				}else{
//					判断是否出现三个头像
					if(bol){
						var c=rndFn(0,4)
						if(c>3){
							var img='<img src="img/xz2.png"/>';
							$(".play .xuzheng").append(img);
						}else{
							var img='<img src="img/xz1.png"/>';
							$(".play .xuzheng").append(img);
						}
					}else{
						var img='<img src="img/xz1.png"/>';
						$(".play .xuzheng").append(img);
					}
				}

			}
//			vartex=count-1
			$(".checkpoint").css("background-image","url(img/txt"+(count-1)+".png)")
			$(".paly01").css("background-image","url(img/"+(count-1)+"_1.png)")
			$(".paly02").css("background-image","url(img/"+(count-1)+"_2.png)")
			$(".paly03").css("background-image","url(img/"+(count-1)+"_3.png)")
			$(".play .xuzheng img").css("width",90/num+"%")
			$(".play .xuzheng img").css("margin",10/(num*2)+"%")
			$(".play .xuzheng img").css("height",$(".play .xuzheng img").width())
		}

//点击事件
		function divOnclickFn(obj){
			obj.onclick=function(){
				if($("span").html()=="0.00"){return}
				$(".reward").show();
//				$(".reward").html(count-1)
				$(".reward div").css("background-image","url(img/reward0"+(count-1)+".png)")
				setTimeout(function(){
					if(rbol){rbol=false;return};
					clickFn()
				},1000)
			}
		}
//		点击奖励界面 奖励消失,开始下一关
		$(".reward").on("click",function(){
				rbol=true;
				if(num==7){
					$(".checkpoint").hide();
					$(".paly01").hide();
					$(".paly02").hide();
					$(".paly03").hide();
					$(".play").hide();
					$(".end").show();
					$(".reward").hide();
				}else{
					clickFn()
				}

		})
//		奖励消失,开始下一关
		function clickFn(){
			index++;
			$(".reward").hide();
			$(".play .xuzheng").html('')
			num++;
			count++;
			bol=false;
			if(count>=9){
				num=7;
			}else if(count>=7){
				count>7?bol=true:bol=false;
				num=6;
			}else if(count>=5){
				count>5?bol=true:bol=false;
				num=5;
			}
			divFn(0,num)

		}
