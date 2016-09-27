

var Aimg=["1_1.png","1_2.png","1_2.png"
,"2_1.png","2_2.png","2_2.png"
,"3_1.png","3_2.png","3_2.png"
,"4_1.png","4_2.png","4_2.png"
,"5_1.png","5_2.png","5_2.png"
,"6_1.png","6_2.png","6_2.png"
,"7_1.png","7_2.png","7_2.png"
,"8_1.png","8_2.png","8_2.png"
,"11_1.png","12_1.png","13_1.png"
,"14_1.png","15_1.png","16_1.png"
,"17_1.png","18_1.png","bg.jpg"
,"jigsaw01.png","jigsaw02.png","jigsaw03.png"
,"jigsaw04.png","jigsaw05.png","jigsaw06.png"
,"jigsaw07.png","jigsaw08.png","kuang.png"
,"load.png","logobg2.png","phone.png"
,"star1.png","star2.png","star3.png"
,"star4.png","star5.png","star6.png"
,"star7.png","star8.png","starbg.jpg","start.png"
,"super_body1.png","super_body2.png","super_body3.png","super_head.png"
,"txt1.png","txt2.png","txt3.png","txt4.png","txt5.png"
,"txt6.png","txt7.png","txt8.png"
,"xz.png","xz1.png","xz2.png"]
var index=0;
var bol=true;
var audio=document.querySelectorAll("audio");

for (var i = 0; i < Aimg.length; i++) {
	var img=document.createElement("img");
	img.src="./img/"+Aimg[i];
	img.onload=function(){
		index++;
		if(index>=Aimg.length){
			$(".wrap").css({backgroundSize:"100% 100%",backgroundImage:"url(img/starbg.jpg)"})

			$('.loading').fadeOut(function(){
				//文字动画
				$(".xing").show()
				$(".xing1").show()
				$(".xing2").show()
				$(".xing3").show()
				audio[0].play();
				audio[0].loop="loop"
//				audio[0].volume = 0.3;
				$('.con1').show();
				audio[5].play();
				audio[5].loop="loop"
				fontshow(function($con){
					$con.fadeOut(function(){
						// if(bol){
						audio[5].pause()
						$('.con1').hide();
							$('.super').show();
						// }
					})
				})
			})
		}
	}
}


//动画结束切换界面部分

$(".super").on("animationend",function(){
	$(".phone").show()
	$(".super").hide()
})
$(".phone").on("animationend",function(){
	$(".phone2").show()
	setTimeout(function(){
		$(".phone").hide();
		$(".ball").show();
		$(".xing").hide()
		$(".xing1").hide()
		$(".xing2").hide()
		$(".xing3").hide()},1000)
})
$(".phone2").on("animationend",function(){
	$(".phone2").hide()
	$(".ball div").css("opacity",1)
	$(".start").show()
	
	
})


//文字部分
function fontshow(cb) {
	$con = $('.con');
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


$(".con1").on("click",function(){
	
})
