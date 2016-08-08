
//背景
function Bg(w,h) {
	var bg = this;
	bg.w = w;
	bg.h = h;
	bg.y = 0;
	bg.img = oArr[0];
	bg.speed = 4; //速度
	bg.draw = function () {
		bg.y +=bg.speed;
		if (bg.y>=canvas.height) {bg.y =0}
		//画两张图片做无缝滚动
		ctx.drawImage(bg.img,0,0,bg.w,bg.h,0,bg.y,canvas.width,canvas.height)
		ctx.drawImage(bg.img,0,0,bg.w,bg.h,0,bg.y-canvas.height,canvas.width,canvas.height)

	}
}
//玩家飞机
function Hero(w,h) {
	var hero = this;
	hero.w = w;
	hero.h = h;
	hero.bom=false
	hero.x = canvas.width/2-hero.w/2;
	hero.y = canvas.height*0.9 -hero.h;
	hero.i = 0; //数组imgs的下标
	hero.delay = 4;
	hero.dI = 0;//判断延时hero.delay;
	hero.imgs =[oArr[1],oArr[2],oArr[3],oArr[4],oArr[5],oArr[6]];
	hero.draw = function (audio1,audio2) {
		hero.dI++;
		if (hero.dI>hero.delay) {
			//切换图片0101
			if (hero.bom) {
				audio1.pause()
				audio2.play()
				hero.i++
				if (hero.i>hero.imgs.length-1) {
					over=true
				}
				hero.dI = 0;
			}
			else {hero.i = Number(!hero.i);hero.dI = 0;}
		}
		if (over) {return}
		ctx.drawImage(hero.imgs[hero.i],hero.x,hero.y)
	}
}
//所有敌机
function Diji(w,h,type) {
	var json = {
		l:{
			arr:[oArr[13],oArr[14],oArr[15],oArr[16],oArr[17],oArr[18],oArr[19],oArr[20]],
			hp:10,
			delay:150,
			dieScore:200,
			speed:0.5
		},
		m:{
			arr:[oArr[21],oArr[22],oArr[23],oArr[24],oArr[25]],
			hp:5,
			delay:80,
			dieScore:100,
			speed:1.5
		},
		s:{
			arr:[oArr[8],oArr[9],oArr[10],oArr[11],oArr[12]],
			hp:2,
			delay:50,
			dieScore:20,
			speed:2.5
		}
	}
	var obj = this;
	obj.w =w;
	obj.h =h;
	obj.imgs = json[type].arr;
	obj.i = 0;
	obj.speed = json[type].speed;
	obj.delay = json[type].delay;
	obj.dI = 0;//判断延时用
	obj.arr = [];//存放敌人
	obj.die = false;
	
	obj.draw = function (hero,audio,audio1) {
		obj.dI++;
		//延时创建敌人
		if (obj.dI>obj.delay) {
			//随机敌人的位置
			var x = Math.random()*(canvas.width-obj.w);
			var speed = Math.random()*2+obj.speed;
			var obj1 ={x:x,y:-obj.h,w:obj.w,h:obj.h,hp:json[type].hp,speed:speed,delay:4,dI:0,i:0,die:false,dieScore:json[type].dieScore} //hb敌机的血量，被子弹打中血量就会减少
		
			obj.arr.push(obj1);
			obj.dI=0;//重新延迟
		}
		//obj.arr[0] = obj
		
		for (var i = 0; i < obj.arr.length; i++) {
			if (obj.arr[i].hp<=0) {//判断血量是否小于0
				obj.arr[i].die = true;//记录爆炸了
				audio.play()

			}
			if (obj.arr[i].die||obj.arr[i].y>canvas.height) {

				obj.arr[i].dI++;
				if (obj.arr[i].dI>obj.arr[i].delay) {
					obj.arr[i].i++; //爆炸图片切换
					obj.arr[i].dI=0;
				}
				
				if (obj.arr[i].i>obj.imgs.length-1) {
					// obj.arr.pop()
					//图片消失删除数组
					obj.arr.splice(i,1);
					i--;
					continue;
				}
				
			}
			//画敌人:
			obj.arr[i].y +=obj.arr[i].speed
			audio1.play()
			ctx.drawImage(obj.imgs[obj.arr[i].i],obj.arr[i].x,obj.arr[i].y)
		//------+-------
			if (!obj.arr[i].die) {
				if (check(hero,obj.arr[i].x,obj.arr[i].y)||check(hero,obj.arr[i].x+obj.w,obj.arr[i].y)||check(hero,obj.arr[i].x+obj.w,obj.arr[i].y+obj.h)||check(hero,obj.arr[i].x,obj.arr[i].y+obj.h)) {
						hero.bom=true
					}
				}
			}
	}
		//------+-------
		function check(hero,x,y) {
			ctx.beginPath();
			ctx.rect(hero.x,hero.y,hero.w,hero.h)
			ctx.closePath();
			if (ctx.isPointInPath(x,y)){
				return true;
			}
		}
		
}
//子弹
function Bullet(w,h,ws) {
	var Bu = this;
	Bu.w =w;
	Bu.h =h;
	Bu.ws =ws;
	Bu.img = oArr[7];
	Bu.imgs = oArr[31];
	Bu.change=false
	Bu.speed = 10;
	Bu.delay = 5;
	Bu.dI = 0;//判断延时用
	Bu.obs = [];//存放子弹的数组
	Bu.changeDI = 0
	Bu.draw = function (hero,arr,audio) {
		Bu.dI++;
		if (Bu.dI>Bu.delay) {
			var obj ={x:hero.x+hero.w/2-Bu.w/2,y:hero.y-Bu.h-5}
			//添加子弹
			Bu.obs.push(obj)
			Bu.dI =0;//重新延迟
		}
		//画出所有子弹
		for (var i = 0; i < Bu.obs.length; i++) {
			Bu.obs[i].y -=Bu.speed;

			//如果子弹超出屏幕就把它删除
			if (Bu.obs[i].y<-Bu.h||check(arr,Bu.obs[i].x,Bu.obs[i].y)) {
				//Bu.obs.shift();
				Bu.obs.splice(i,1)
				i--;
				continue;
			}
			audio.play()
			if (Bu.change && Bu.changeDI<1000) {Bu.changeDI++;ctx.drawImage(Bu.imgs,hero.x+hero.w/2-Bu.ws/2,Bu.obs[i].y)}
			else {ctx.drawImage(Bu.img,Bu.obs[i].x,Bu.obs[i].y)}
		}
		
	}
	//用来检测子弹是否打中敌机
	function check(arr,x,y) {
		for (var i = 0; i < arr.length; i++) {
				ctx.beginPath();
				ctx.rect(arr[i].x,arr[i].y,arr[i].w,arr[i].h)
				ctx.closePath();
			if (ctx.isPointInPath(x,y)|| ctx.isPointInPath(x+Bu.w,y)){
				arr[i].hp--;
				score+=100;
				
				//如果有一驾飞机的hb被打完了,全局的分数那里就加10分
				if (arr[i].hp<=0 || arr[i].die) {
					score +=arr[i].dieScore;
				}
				return true;
			}
		}
		
	}

}
//补给
function Bom(w,h,ww,hh,hs) {
	var bom = this
	bom.w=w
	bom.ww = ww;
	bom.hh = hh;
	bom.h=h
	bom.hs=hs
	bom.img=[oArr[33],oArr[30]]
	bom.imgs=oArr[32]
	bom.index=0
	bom.delay=1000
	bom.dI=0
	bom.draw=function (hero,Bu) {
		bom.dI++
		if (bom.dI>bom.delay) {
			bom.speed = Math.random()*2+5
			bom.x = Math.random()*(canvas.width-bom.w);
			bom.y = -bom.h
			bom.num=(Math.random()-0.5)*10
			bom.bol=true
			bom.dI=0
			bom.math=Math.random()
		}
		if (bom.bol&&bom.math<0.5) {
			if (bom.x>canvas.width-bom.w) {bom.num*=-1}
			else if(bom.x<0){bom.num*=-1}
			bom.x+=bom.num	
			bom.y+=bom.speed
			ctx.drawImage(bom.img[0],bom.x,bom.y)
			if (bom.y>=canvas.height) {bom.bol=false}
			if (check(hero,bom.x,bom.y)||check(hero,bom.x+bom.w,bom.y)||check(hero,bom.x+bom.w,bom.y+bom.h)||check(hero,bom.x,bom.y+bom.h)) {bom.bol=false;bom.index++;}
		}
		if (bom.bol&&bom.math>=0.5) {
			if (bom.x>canvas.width-bom.w) {bom.num*=-1}
			else if(bom.x<0){bom.num*=-1}
			bom.x+=bom.num	
			bom.y+=bom.speed
			ctx.drawImage(bom.img[1],bom.x,bom.y)
			if (bom.y>=canvas.height) {bom.bol=false}
			if (check(hero,bom.x,bom.y)||check(hero,bom.x+bom.ww,bom.y)||check(hero,bom.x+bom.ww,bom.y+bom.hh)||check(hero,bom.x,bom.y+bom.hh)) {bom.bol=false;Bu.change=true}
		}
		ctx.drawImage(bom.imgs,5,canvas.height-bom.hs-10)
		ctx.font = "30px 黑体";
		ctx.fillText('x'+bom.index,50,canvas.height-17)
	}
	function check(hero,x,y) {
		ctx.beginPath()
		ctx.rect(hero.x,hero.y,hero.w,hero.h)
		ctx.closePath()
		if (ctx.isPointInPath(x,y)){
			return true
		}
	}
}