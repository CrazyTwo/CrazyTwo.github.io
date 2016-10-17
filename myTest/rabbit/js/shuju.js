
var arr = [
			{
			"src":"img/g1.png",
			"name":"科尔沁牛腩切块500g",
			"use":"脂肪少，适合炖汤",
			"pay":"21.80"
			},
			{
			"src":"img/g2.png",
			"name":"精选有机胡萝卜300g",
			"use":"胡萝卜富含维生素",
			"pay":"8.60"
			},
			{
			"src":"img/g3.png",
			"name":"精选本地豆角300g",
			"use":"富含维生素和矿物质等",
			"pay":"10.20"
			},
			{
			"src":"img/g4.png",
			"name":"精选本地柿子椒500g",
			"use":"它可以防止坏血病",
			"pay":"15.80"
			}
		]
 



var cont = document.querySelector('.content');

		for (var i = 0; i < arr.length; i++) {
			var div= document.createElement('div');
			div.innerHTML = '<div class="chose fl"><div></div></div><div class="fl pic"><img src="'+arr[i].src+'" alt=""></div><div class="fl into"><p>'+arr[i].name+'</p><p>'+arr[i].use+'</p></div><p class="cost"><em>￥</em><span>'+arr[i].pay+'</span</p><div class="money clear"><div class="fl rem">-</div><div class="fl inn">1</div><div class="fl add">+</div></div><div class="lost">删<br>除</div>';
			div.className = "list_1 clear";
			cont.appendChild(div);
		}

	var list_1 = document.querySelector('.list_1');
	var bj = document.querySelector('.bj');//编辑键
	var chose = document.querySelectorAll('.chose div');//选择框
	var rem = document.querySelectorAll('.rem');//商品个数减
	var inn = document.querySelectorAll('.inn');//商品个数
	var add = document.querySelectorAll('.add');//商品个数加
	var cost = document.querySelectorAll('.cost span')//每种商品的价格
	var choses = document.querySelector('.choses');//全选框
	var hj  = document.querySelector('.hj');//合计金额
	var js  = document.querySelector('.js a');
	var lost = document.querySelectorAll('.lost');
	var bol = false;
	var index = 0;
	var n=0;
	var m = 1;
	var sum = 0;
	var j = 0;
	for (var i = 0; i < chose.length; i++) {
		chose[i].index=i;
		chose[i].addEventListener('touchstart',function(){
			if (!this.bol) {
				this.style.background = "rgba(106,180,57,1)";
				index++;
				n = inn[this.index].innerHTML*Number(cost[this.index].innerHTML)
				this.bol=true;
				sum +=n;
				$_money();
			}else {
				index--;
				this.style.background = "rgba(106,180,57,0)";
				this.bol=false;
				n = inn[this.index].innerHTML*Number(cost[this.index].innerHTML)
				sum -=n;
				if (sum<0) {sum=0}
				$_money();
			}
			check()
			js.innerHTML = "去结算("+index+")";
		})
	}

	choses.addEventListener('touchstart',function(){
		if (!this.bol) {
			for (var i = 0; i < chose.length; i++) {
				this.style.background = "rgba(106,180,57,1)";
				chose[i].style.background = "rgba(106,180,57,1)";
				this.bol=true;
				chose[i].bol=true;
				j += inn[i].innerHTML*Number(cost[i].innerHTML)
			}
			sum = j;
			index = chose.length;
			js.innerHTML = "去结算("+index+")";
			$_money();

		}else {
			for (var i = 0; i < chose.length; i++) {
				this.style.background = "rgba(106,180,57,0)";
				chose[i].style.background = "rgba(106,180,57,0)";
				this.bol=false;
				chose[i].bol=false;
			}
			sum=0;
			index=0;
			j=0;
			js.innerHTML = "去结算(0)";
			$_money();
		}
	})
	for (var i = 0; i < add.length; i++) {
		add[i].index = i;
		add[i].addEventListener('touchstart',function(){
			inn[this.index].innerHTML = parseInt(inn[this.index].innerHTML)+1;
			if (chose[this.index].bol) {
				sum +=Number(cost[this.index].innerHTML);
				$_money();
			}
		})
	}
	for (var i = 0; i < rem.length; i++) {
		rem[i].index = i;
		rem[i].addEventListener('touchstart',function(){
			if (parseInt(inn[this.index].innerHTML)<2) {
				inn[this.index].innerHTML = 1;
				return;
			}else {
				inn[this.index].innerHTML = parseInt(inn[this.index].innerHTML)-1;
			}
			if (chose[this.index].bol) {
				sum -=  Number(cost[this.index].innerHTML)
				$_money();
			}	
		})
	}
	function $_money(){
		hj.children[0].innerHTML = "合计：￥"+sum.toFixed(2);
		hj.children[1].innerHTML = "总额："+sum.toFixed(2);
	}
	function check() {
		if (index==chose.length) {
			choses.style.background = "rgba(106,180,57,1)";
			choses.bol=true;
		}else{
			choses.style.background = "rgba(106,180,57,0)";
			choses.bol=false;
		}
	}
	bj.addEventListener('touchstart',function(){
		if (!this.bol) {
			this.innerHTML = "完成";
			$('.lost').each(function (i) {
				$('.lost').eq(i).slideDown(1000);
			})
			$('.money').each(function (i) {
				$('.money').eq(i).animate({right:"20%"},1000)
			})	
			this.bol = true;
		}else {
			this.innerHTML = "编辑";
			$('.lost').each(function (i) {
				$('.lost').eq(i).slideUp(1000);
			})
			$('.money').each(function (i) {
				$('.money').eq(i).animate({right:"3%"},1000)
			})	
			this.bol = false;
		}
	})
	var arr = [];
	lostFn()
	function lostFn() {
		for (var i = 0; i < lost.length; i++) {
			lost[i].index = i;
			lost[i].addEventListener('touchstart',function(){
				arr.push(this.parentNode);
				cont.removeChild(arr[0]);
				if (chose[this.index].bol) {
					index--;
					sum -= inn[this.index].innerHTML*Number(cost[this.index].innerHTML);
					if (sum<0) {sum=0}
					js.innerHTML = "去结算("+index+")";
				}
				$_money();
				arr = [];
			})
		}
	}






 

