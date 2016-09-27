

function gundong() {
	var warp=$(".bot");
	var left=$(".bot .left");
	var right=$(" .bot .r");
	var gun=$(".bot .r p");

	var rH=right.height();
	var lH=left.height();
	var wH=warp.height();

	var bil=(lH-wH)/(wH-gun.height());
		console.log(bil);
	var y=0;
	var t=0;
//鼠标拖拽事件
	gun.on("touchstart",function (e) {
		var e=e||window.event;
		var s=e.touches[0].clientY;
		t=e.touches[0].clientY-right.offset().top;
		right.on("touchmove",function(e){
			y=e.touches[0].clientY-s;
			if(y>0){
				y=e.touches[0].clientY-s;
			}else {
				y=e.touches[0].clientY-t;
			}
			if(y<=0){y=0}
			if(y>right.height()-gun.height()){y=right.height()-gun.height()}
			// console.log(y);
			gun.css("top",y+'px');
			left.css("top",-y*bil+'px');
			e.cancelBubble=true;
		})
	})


function dFn(li1,start,shange,fn){
		var start=start;//开始的位置
		var shange=shange;//从开始位置加500，移动的距离
		var t=0;//开始 在哪一步的位置
		var endT=20;//到达终点需要的步数

		var time=setInterval(function(){
			t++;
			if(t>=endT){
				clearInterval(time);
				fn && fn();
			}
			var l=Tween.Quad.easeInOut(t,start,shange,endT);
			li1.css("top",l+"px");
		},20)
	}

}
