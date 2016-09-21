window.onload = function (){
	var load = document.querySelector(".loading");
	var load_p = document.querySelector(".loading p");

	var imgArr = ["load_img/load_bg1.jpg","load_img/load_bg2.jpg","load_img/load_bg3.jpg"];
        loadImage(imgArr,function(){
            load.style.display = "none";
        })



//	var time = document.getElementById('time');
	var bd = document.getElementById('load');
	var wrap = document.getElementsByClassName('wrap')[0];
	bd.style.height = window.screen.availHeight + 'px';
	var imgArr = ['load_bg1.jpg','load_bg2.jpg','load_bg3.jpg'];
	bd.style.backgroundImage = 'url(load_img/'+imgArr[rndFn(0,imgArr.length-1)]+')';
	var settimer = document.getElementsByClassName('bg')[0];
	var clock =document.getElementById('clock');
	var back_time = document.getElementById('back_time');
	var ftr = document.getElementsByClassName('footer')[0];
	var bars = ftr.getElementsByTagName('div');
	var tab = document.getElementsByClassName('tab');
	var bf = 1;
	//设置定时的点击事件
	clock.onclick = function (){
		settimer.style.display = 'block';
	}
	//退出设置定时的点击事件
	back_time.onclick = function (){
		settimer.style.display = 'none';
	}
	//页面切换
	for (var i=0; i<bars.length;i++) {
		bars[i].index = i;
		bars[i].onclick = function(){
			tab[bf].style.display = 'none';
			tab[this.index].style.display = 'block';
			bf =this.index;
		}
	}
	//随机函数
	function rndFn(min,max){
		return Math.round(Math.random()*(max-min)+min);//返回max到min的随机数
	}
//	timeFn(Number(time.innerHTML));
	timeFn(5);
	//loading功能
	function timeFn(n){
		var timer = setInterval(function(){
			n-=1;
			if(n<=0){
				clearInterval(timer);
				bd.style.display = 'none';
				wrap.style.display = 'block';
			}
//			time.innerHTML = n;
		},1000)
	}













	function loadImage(imgsrc,cb) {
            if (imgsrc.constructor != Array) {
                imgsrc = [imgsrc];
            }
            var index = 0;
            var scale = 0;
            for (var i = 0; i < imgsrc.length; i++) {
                var img = new Image();
                img.src = imgsrc[i];
                img.onload = function() {
                    index ++;
                    scale = index/imgsrc.length;
                    load_p.style.width = scale*100+"%"
                    if (index == imgsrc.length) {
                        cb && cb();
                    }
                }
            }
        }
}
